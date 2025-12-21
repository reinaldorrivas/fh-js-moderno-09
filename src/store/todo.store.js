import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "all",
  Completed: "completed",
  Pending: "pending",
};

Object.freeze(Filters);

const state = {
  todos: [],
  filter: Filters.All,
};

Object.seal(state);

const initStore = () => {
  if (!localStorage.getItem("state")) return;

  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem("state")
  );

  todos.forEach((todo) => {
    state.todos.push(new Todo(todo.description));
  });

  todos.forEach((todo, index) => {
    if (todo.done) {
      state.todos[index].done = true;
    }
  });

  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  localStorage.setItem("state", JSON.stringify(state));
};

/**
 *
 * @param {string} filter
 */
const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return structuredClone(state.todos);

    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);

    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);

    default:
      throw new Error(`Option ${filter} is not valid.`);
  }
};

/**
 *
 * @param {string} description
 */
const addTodo = (description) => {
  if (!description) throw new Error("Description is required.");

  state.todos.push(new Todo(description));

  saveStateToLocalStorage();
};

/**
 *
 * @param {string} todoId
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }

    return todo;
  });

  saveStateToLocalStorage();
};

/**
 *
 * @param {string} todoId
 */
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);

  saveStateToLocalStorage();
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);

  saveStateToLocalStorage();
};

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  if (
    newFilter !== Filters.All &&
    newFilter !== Filters.Completed &&
    newFilter !== Filters.Pending
  )
    throw new Error(`Option ${newFilter} is not valid.`);

  state.filter = newFilter;

  saveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  setFilter,
  toggleTodo,
};
