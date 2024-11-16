type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

let todos: Todo[] = [];

const addTodo = (title: string): void => {
  const newTodo: Todo = {
    id: todos.length + 1,
    title,
    completed: false,
  };
  todos = [...todos, newTodo]; //スプレッド構文で要素を追加し　todosに代入して更新
  console.log(`${newTodo.title} added.`);
};

const completeTodo = (id: number): boolean => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = true;
    return true; //成功
  }
  return false; //失敗
};

const getIncompleteTodos = (): Todo[] => {
  return todos.filter((todo) => !todo.completed);
};

const updateTodo = (id: number, fieldsToUpdate: Partial<Todo>): boolean => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], ...fieldsToUpdate };
    return true;
  }
  return false;
};

// Usage example
addTodo("Learn TypeScript");
addTodo("Practice coding");
completeTodo(1);
console.log("Incomplete Todos:", getIncompleteTodos());
