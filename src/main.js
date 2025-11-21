import "./style.css";
import { App } from "./todos/app";
import todoStore from "./store/todo.store";

App("#app");

todoStore.initStore();
