import { getTodosFromDataStore } from "../utils/read-write-service";
import {
  ADD_TODO,
  DELETE_TODO,
  GET_STATS,
  GET_TODOS,
  SELECT_TODO,
  TOGGLE_ALERT,
  UPDATE_TODO,
} from "./types";

const INITIAL_STATE = {
  todos: [],
  currentTodo: null,
  alert: {
    text: "",
    action: null,
  },
  searchText: "",
  page: 0,
  stats: {
    completed: 0,
    total: 0,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TODOS: {
      return {
        ...state,
        todos: [...state.todos, ...action.payload.todos],
        searchText: action.payload.searchText,
        page: action.payload.page,
      };
    }
    case ADD_TODO: {
      const clonedList = [...state.todos, action.payload];
      return {
        ...state,
        todos: clonedList,
        stats: {
          ...state.stats,
          total: state.stats.total + 1,
        },
      };
    }

    case SELECT_TODO: {
      const currentTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      return {
        ...state,
        currentTodo,
      };
    }
    case UPDATE_TODO: {
      const todoIndex = state.todos.findIndex(
        (t) => t.id === action.payload.id
      );
      const clonedTodosList = [...state.todos];
      if (todoIndex > -1) {
        clonedTodosList[todoIndex] = action.payload;
      }
      return {
        ...state,
        todos: clonedTodosList,
        stats: {
          ...state.stats,
          completed: clonedTodosList.filter((todo) => todo.isCompleted).length,
        },
      };
    }

    case DELETE_TODO: {
      const updatedList = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      if (updatedList.length < 4) {
        const moreTodos = getTodosFromDataStore(state.searchText, state.page);
        if (moreTodos.length) {
          moreTodos.forEach((moreTodo) => {
            const newTodoIndex = updatedList.findIndex(
              (todo) => moreTodo.id === todo.id
            );
            if (newTodoIndex === -1) {
              updatedList.push(moreTodo);
            }
          });
        }
      }
      return {
        ...state,
        todos: updatedList,
      };
    }

    case GET_STATS: {
      return {
        ...state,
        stats: {
          completed: action.payload.completed,
          total: action.payload.total,
        },
      };
    }

    case TOGGLE_ALERT: {
      return {
        ...state,
        alert: {
          text: action.payload.text,
          action: action.payload.action,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
