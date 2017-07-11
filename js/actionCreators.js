import axios from "axios";
import { API_PATH, LOCAL_STORAGE_KEY } from "./config";
import * as Actions from "./actions";

export function setSearchTerm(term) {
  return { type: Actions.SET_SEARCH_TERM, payload: term };
}

export function toggleNewTodoPrompt(todoId) {
  return { type: Actions.TOGGLE_TODO_PROMPT, payload: todoId };
}

export function addTodo(todo) {
  return { type: Actions.ADD_TODO, payload: todo };
}

export function editTodo(todo) {
  return { type: Actions.EDIT_TODO, payload: todo };
}

export function deleteTodo({todo, erasedTodo}) {
  return { type: Actions.DELETE_TODO, payload: { todoToRemove: [todo.id, ...erasedTodo]} };
}

export function toggleTodoState(todo) {
  return function(dispatch) {
    const todoCopy = Object.assign({}, todo);
    todoCopy.finished = !todoCopy.finished;
    axios
      .put(`${API_PATH}/todos/${todoCopy.id}`, todoCopy)
      .then(res => {
        dispatch(editTodo(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
}

function createRootTodo() {
  return function(dispatch) {
    axios
      .post(`${API_PATH}/todos`)
      .then(res => {
        dispatch(addTodo(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
}

function getTodoTree(localStorageTodoId) {
  return function(dispatch) {
    axios
      .get(`${API_PATH}/todos/${localStorageTodoId}`)
      .then(res => {
        dispatch(addTodo(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function deleteTodoRequest(todo) {
  return function(dispatch) {
    axios
      .delete(`${API_PATH}/todos/${todo.id}`)
      .then(res => {
        dispatch(deleteTodo(res.data))
      })
      .catch(err => {
        console.error(err);
      })
  }
}

export function editTodoRequest(todo) {
  return function(dispatch) {
    axios
      .put(`${API_PATH}/todos/${todo.id}`, todo)
      .then(res => {
        dispatch(editTodo(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function createTodoRequest(todo) {
  return function(dispatch) {
    axios
      .post(`${API_PATH}/todos`, todo)
      .get(res => {
        dispatch(addTodo(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function tryGettingRoot() {
  return function(dispatch) {
    if (
      typeof localStorage === "object" &&
      localStorage.hasOwnProperty(LOCAL_STORAGE_KEY)
    ) {
      dispatch(getTodoTree(localStorage[LOCAL_STORAGE_KEY]));
    } else {
      dispatch(createRootTodo());
    }
  };
}
