import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: "all",
  Completed: "completed",
  Pending: "pending",
};

const state = {
  todos: [
    new Todo("Piedra del poder."),
    new Todo("Piedra del tiempo."),
    new Todo("Piedra del mente."),
    new Todo("Piedra del espacio."),
    new Todo("Piedra del realidad."),
    new Todo("Piedra del alma."),
  ],

  filter: Filters.All,
};

const initStore = () => {
  console.log({ initStore: state });
};

const loadStore = () => {
  throw new Error("Not implemented");
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
};

/**
 *
 * @param {string} todoId
 */
const deleteTodo = (todoId) => {
  state.todos.filter((todo) => todo.id !== todoId);
};

const deleteCompleted = () => {
  state.todos.filter((todo) => todo.done);
};

/**
 *
 * @param {string} filter
 */
const setFilter = (filter = Filters.All) => {
  if (filter !== Filters.All || filter !== Filters.Completed || Filters.Pending)
    throw new Error(`Option ${filter} is not valid.`);

  state.filter = filter;
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
  loadStore,
  setFilter,
  toggleTodo,
};
