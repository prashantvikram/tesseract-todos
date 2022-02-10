import {
  ADD_TODO,
  CHANGE_PAGE,
  DELETE_TODO,
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
      };
    }

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case CHANGE_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
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
