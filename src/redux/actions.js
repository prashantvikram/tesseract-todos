import {
  deleteFromDataStore,
  getStatsFromDataStore,
  getTodosFromDataStore,
  updatedContentInDataStore,
  writeTodoToDataStore,
} from "../utils/read-write-service";
import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  SELECT_TODO,
  TOGGLE_ALERT,
  UPDATE_TODO,
  GET_STATS,
} from "./types";

export const getTodos = (searchText = "", page = 0) => {
  const todos = getTodosFromDataStore(searchText, page);
  return {
    type: GET_TODOS,
    payload: { todos, searchText, page },
  };
};

export const addTodo = (todo) => {
  writeTodoToDataStore(todo);
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const selectTodo = (id) => {
  return {
    type: SELECT_TODO,
    payload: id,
  };
};

export const updateTodo = (todo) => {
  updatedContentInDataStore(todo);
  return {
    type: UPDATE_TODO,
    payload: todo,
  };
};

export const deleteTodo = (id) => {
  deleteFromDataStore(id);
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const toggleAlert = (text, action) => {
  return {
    type: TOGGLE_ALERT,
    payload: { text, action },
  };
};

export const getStats = () => {
  const { completed, total } = getStatsFromDataStore();
  return {
    type: GET_STATS,
    payload: { completed, total },
  };
};
