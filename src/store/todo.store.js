import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: "all",
  Completed: "completed",
  Pending: "pending",
};

Object.freeze(Filters);

const state = {
  todos: [
    new Todo("Piedra del poder."),
    new Todo("Piedra del tiempo."),
    new Todo("Piedra de la mente."),
    new Todo("Piedra del espacio."),
    new Todo("Piedra de la realidad."),
    new Todo("Piedra del alma."),
  ],

  filter: Filters.All,
};

Object.seal(state);

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
  state.todos.filter((todo) => !todo.done);
};

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  if (
    newFilter !== Filters.All ||
    newFilter !== Filters.Completed ||
    newFilter !== Filters.Pending
  )
    throw new Error(`Option ${newFilter} is not valid.`);

  state.filter = newFilter;
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
