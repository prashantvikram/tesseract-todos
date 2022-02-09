import {
  GET_TODOS,
  ADD_TODO,
  UPDATE_CONTENT,
  COMPLETE_TODO,
  FAVOURITE_TODO,
  DELETE_TODO,
  SELECT_TODO,
  CHANGE_PAGE,
} from "./types";

export const getTodos = () => {
  const todos = [];
  try {
    const storedTodos = window.localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      if (parsedTodos && Array.isArray(parsedTodos) && parsedTodos.length) {
        todos.push(...parsedTodos);
      }
    }
  } catch (error) {
    console.error(error);
  }
  return {
    type: GET_TODOS,
    payload: todos,
  };
};

export const addTodo = (todo) => {
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

export const updateContent = (id, content) => {
  return {
    type: UPDATE_CONTENT,
    payload: { id, content },
  };
};

export const markCompleted = (id) => {
  return {
    type: COMPLETE_TODO,
    payload: id,
  };
};

export const markFavourite = (id) => {
  return {
    type: FAVOURITE_TODO,
    payload: id,
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const changePage = (page) => {
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
};
