import sampleData from "./sample-data";

export const getTodosFromDataStore = (searchText = "", page = 0) => {
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
  if (todos.length === 0) {
    todos.push(...sampleData);
    todos.map(writeTodoToDataStore);
  }
  const filteredTodos = todos.filter((todo) =>
    todo.content.includes(searchText)
  );

  const pageSize = 4;
  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedTodos = filteredTodos.slice(start, end);
  return paginatedTodos;
};

export const writeTodoToDataStore = (todo) => {
  const todos = [];
  try {
    const storedTodos = window.localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      if (parsedTodos && Array.isArray(parsedTodos) && parsedTodos.length) {
        parsedTodos.push(todo);
        todos.push(...parsedTodos);
      }
    } else {
      todos.push(todo);
    }
    window.localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error(error);
  }
};

export const updatedContentInDataStore = (todo) => {
  try {
    const storedTodos = window.localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      if (parsedTodos && Array.isArray(parsedTodos) && parsedTodos.length) {
        const clonedTodos = [...parsedTodos];
        const todoIndex = clonedTodos.findIndex((ct) => ct.id === todo.id);
        if (todoIndex > -1) {
          clonedTodos[todoIndex] = todo;
        }
        window.localStorage.setItem("todos", JSON.stringify(clonedTodos));
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteFromDataStore = (id) => {
  try {
    const storedTodos = window.localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      if (parsedTodos && Array.isArray(parsedTodos) && parsedTodos.length) {
        const clonedTodos = parsedTodos.filter((pt) => pt.id !== id);
        window.localStorage.setItem("todos", JSON.stringify(clonedTodos));
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const getStatsFromDataStore = () => {
  let total = 0;
  let completed = 0;
  let todos = sampleData;
  try {
    const storedTodos = window.localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      if (parsedTodos && Array.isArray(parsedTodos) && parsedTodos.length) {
        todos = parsedTodos;
      }
    }
    total = todos.length;
    completed = todos.filter((pt) => pt.isCompleted).length;
  } catch (error) {
    console.error(error);
  }

  return { completed, total };
};
