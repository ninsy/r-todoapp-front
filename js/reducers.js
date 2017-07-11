import { combineReducers } from "redux";
import * as Actions from "./actions";


const searchTerm = (state = "", action) => {
  if (action.type === Actions.SET_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};

const todos = (state = {}, action) => {
  switch (action.type) {
    case Actions.ADD_TODO: {
      const stateCopy = Object.assign({}, state);
      if(!stateCopy.root) {
        stateCopy.root = action.payload;
        stateCopy.todo = [];
      } else {
        stateCopy.todo[action.payload.id] = action.payload;
      }
      return Object.assign({}, state, { [action.payload.id]: action.payload });
    }
    case Actions.TOGGLE_TODO_VIEW:
    case Actions.TOGGLE_TODO_STATE:
    case Actions.EDIT_TODO: {
      const stateCopy = Object.assign({}, state);
      if(action.payload.id === stateCopy.root.id) {
        stateCopy.root = action.payload;
      } else {
        stateCopy.todo[action.payload.id] = action.payload
      }
      return stateCopy;
    }
    case Actions.DELETE_TODO: {
      const stateCopy = Object.assign({}, state);
      if(action.payload.todoToRemove.indexOf(stateCopy.root.id) > -1) {
        stateCopy.root = {};
        stateCopy.todo = {};
      } else {
        stateCopy.todo = stateCopy.todo.filter(todo => action.payload.todoToRemove.indexOf(todo) === -1);
      }
      return stateCopy;
    }
    case Actions.TOGGLE_TODO_PROMPT: {
      const stateCopy = Object.assign({}, state);
      stateCopy.todo[action.payload.id].newPromptVisible = !stateCopy.todo[
        action.payload.id
      ].newPromptVisible;

      return stateCopy;
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  searchTerm,
  todos
});

export default rootReducer;
