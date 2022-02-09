import {
  ADD_TODO,
  CHANGE_PAGE,
  COMPLETE_TODO,
  DELETE_TODO,
  FAVOURITE_TODO,
  GET_TODOS,
  SELECT_TODO,
  UPDATE_CONTENT,
} from "./types";

const INITIAL_STATE = {
  todos: [],
  paginatedTodos: [],
  currentTodo: null,
  currentPage: 0,
  totalPages: 0,
  pageSize: 4,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TODOS: {
      const start = state.currentPage * state.pageSize;
      const end = start + state.pageSize;
      return {
        ...state,
        todos: action.payload,
        paginatedTodos: action.payload.sort(
          (a, b) => b.updatedAt - a.updatedAt
        ),
        totalPages: Math.ceil(action.payload.length / state.pageSize),
        currentPage: state.currentPage,
      };
    }
    case ADD_TODO: {
      const clonedList = [...state.todos, action.payload];
      return {
        ...state,
        todos: clonedList,
        paginatedTodos: clonedList.sort((a, b) => b.updatedAt - a.updatedAt),
        totalPages: Math.ceil(clonedList.length / state.pageSize),
        currentPage: 0,
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

    case UPDATE_CONTENT: {
      const todoIndex = state.todos.findIndex(
        (t) => t.id === action.payload.id
      );
      const clonedTodosList = [...state.todos];
      if (todoIndex > -1) {
        clonedTodosList[todoIndex].content = action.payload.content;
      }
      return {
        ...state,
        todos: clonedTodosList,
      };
    }

    case COMPLETE_TODO: {
      const todoIndex = state.todos.findIndex((t) => t.id === action.payload);
      const clonedTodosList = [...state.todos];
      if (todoIndex > -1) {
        clonedTodosList[todoIndex].isCompleted =
          !clonedTodosList[todoIndex].isCompleted;
      }
      return {
        ...state,
        todos: clonedTodosList,
      };
    }
    case FAVOURITE_TODO: {
      const todoIndex = state.todos.findIndex((t) => t.id === action.payload);
      const clonedTodosList = [...state.todos];
      if (todoIndex > -1) {
        clonedTodosList[todoIndex].isFavourite =
          !clonedTodosList[todoIndex].isFavourite;
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
      const start = action.payload * state.pageSize;
      const end = start + state.pageSize;
      return {
        ...state,
        paginatedTodos: state.todos.sort((a, b) => b.updatedAt - a.updatedAt),
        currentPage: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
