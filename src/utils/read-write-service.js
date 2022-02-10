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
  if (todos.length === 0) todos.push(...sampleData);
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
