import { combineReducers } from "redux";
import * as Actions from "./actions";

const findNestedTodo = (soughtId, todo) => {
  if (todo === soughtId) {
    return todo;
  } else {
    for (let i = 0; i < todo.todos.lenght; i += 1) {
      const match = findNestedTodo(soughtId, todo.todos[i]);
      if (match) return match;
    }
  }
};

const searchTerm = (state = "", action) => {
  if (action.type === Actions.SET_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};

const todos = (state = {}, action) => {
  switch (action.type) {
    case Actions.EDIT_TODO:
    case Actions.ADD_TODO: {
      const stateCopy = Object.assign({}, state);
      if (Object.keys(state).length) {
        const payloadParent = findNestedTodo(action.payload.parentId, state);
        stateCopy[payloadParent.id].todos[action.payload.id] = action.payload;
      } else {
        stateCopy[action.payload.id] = action.payload;
      }
      return stateCopy;
    }
    case Actions.DELETE_TODO: {
      let stateCopy = Object.assign({}, state);
      if (state.id === action.payload.id) {
        stateCopy = {};
      } else {
        const payloadParent = findNestedTodo(action.payload.parentId);
      }
      delete stateCopy[action.payload.id];
      return stateCopy;
    }
    default:
      return state;
  }
};

const toggleTodoState = (state = {}, action) => {
  if (action.type === Actions.TOGGLE_TODO_STATE) {
    const stateCopy = Object.assign({}, state);
    const soughtTodo = stateCopy.todos.find(id => id === action.payload.id);
    soughtTodo.finished = !soughtTodo.finished;
    return stateCopy;
  }
  return state;
};

const toggleTodoView = (state = {}, action) => {
  if (action.type === Actions.TOGGLE_TODO_VIEW) {
    const stateCopy = Object.assign({}, state);
    const soughtTodo = stateCopy.todos.find(id => id === action.payload.id);
    soughtTodo.visible = !soughtTodo.visible;
    return stateCopy;
  }
  return state;
};

const toggleSearch = (state = {}, action) => {
  if (action.type === Actions.TOGGLE_ADD) {
    const stateCopy = Object.assign({}, state);
    const soughtTodo = stateCopy.todos.find(id => id === action.payload.id);
    soughtTodo.newPromptVisible = !soughtTodo.newPromptVisible;
    return stateCopy;
  }
  return state;
};

const rootReducer = combineReducers({
  searchTerm,
  todos,
  toggleTodoState,
  toggleTodoView,
  toggleSearch
});

export default rootReducer;
