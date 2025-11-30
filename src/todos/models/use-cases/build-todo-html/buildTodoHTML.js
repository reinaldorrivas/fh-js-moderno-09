import { Todo } from "../../todo.model";
import todoTemplate from "./todoTemplate.html?raw";

/**
 *
 * @param {Todo} todo
 */
export const buildTodoHTML = (todo) => {
  if (!todo) throw new Error("A TODO object is required.");

  const todoElement = document.createElement("li");

  todoElement.innerHTML = todoTemplate;
  todoElement.querySelector("label").textContent = todo.description;

  return todoElement;
};
