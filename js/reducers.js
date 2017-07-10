import { combineReducers } from "redux";
import { normalize } from "normalizr";
import * as Actions from "./actions";
import todoSchema from "./schema";

// let todoRoot = {
//   id: 0,
//   name: "wut",
//   todos: [
//     {
//       id: 1,
//       name: "hello",
//       todos: [
//         {
//           id: 4,
//           name: "mate",
//           todos: [{ id: 6, name: "playground", todos: [] }]
//         },
//         {
//           id: 7,
//           name: "kamil",
//           todos: [
//             {
//               id: 11,
//               name: "pati",
//               todos: []
//             }
//           ]
//         }
//       ]
//     },
//     {
//       id: 2,
//       todos: []
//     },
//     {
//       id: 3,
//       todos: [
//         { id: 8, name: "pauli", todos: [] },
//         { id: 9, name: "natalia", todos: [] },
//         {
//           id: 10,
//           name: "agata",
//           todos: [
//             { id: 12, name: "czesc", todos: [] },
//             {
//               id: 14,
//               name: "elo",
//               todos: [{ id: 15, name: "siema", todos: [] }]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };

const searchTerm = (state = "", action) => {
  if (action.type === Actions.SET_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};

const todos = (state = {}, action) => {
  switch (action.type) {
    case Actions.DESERIALIZE_TODOS: {
      const copyState = Object.assign({}, state);
      const normalized = normalize(action.payload, { todoSchema });
      const final = Object.assign(copyState, normalized.entities);
      localStorage[final.root.id] = final.root;
      return final;
    }
    case Actions.EDIT_TODO:
    case Actions.ADD_TODO: {
      return Object.assign({}, state, { [action.payload.id]: action.payload });
    }
    case Actions.DELETE_TODO: {
      const stateCopy = Object.assign({}, state);
      if (state.root.id === action.payload.id) {
        stateCopy.root = {};
        stateCopy.todo = {};
      } else {
        delete stateCopy.todo[action.payload.id];
      }
      return stateCopy;
    }
    case Actions.TOGGLE_TODO_STATE: {
      const stateCopy = Object.assign({}, state);
      stateCopy.todo[action.payload.id].finished = !stateCopy.todo[
        action.payload.id
      ].finished;
      return stateCopy;
    }
    case Actions.TOGGLE_TODO_VIEW: {
      const stateCopy = Object.assign({}, state);
      stateCopy.todo[action.payload.id].visible = !stateCopy.todo[
        action.payload.id
      ].visible;
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
