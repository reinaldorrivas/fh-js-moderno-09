import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: "all",
  Completed: "completed",
  Pending: "pending",
};

const state = {
  todos: [
    new Todo("Pedra del alma."),
    new Todo("Pedra del infinito."),
    new Todo("Pedra del tiempo."),
  ],

  filter: Filters.All,
};

const initStore = () => {
  console.table({ initStore: state });
};

export default {
  initStore,
};
