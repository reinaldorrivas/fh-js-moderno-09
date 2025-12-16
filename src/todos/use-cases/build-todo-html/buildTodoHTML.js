import { Todo } from "../../models/todo.model";
import todoTemplate from "./todoTemplate.html?raw";

/**
 *
 * @param {Todo} todo
 */
export const buildTodoHTML = (todo) => {
  if (!todo) throw new Error("A TODO object is required.");

  const { done, description, id } = todo;

  const todoElement = document.createElement("li");

  todoElement.innerHTML = todoTemplate;

  todoElement.dataset.id = id;
  todoElement.querySelector(".toggle").checked = done;
  todoElement.querySelector("label").textContent = description;
  todoElement.querySelector("label").htmlFor = id;
  todoElement.querySelector(".edit").id = id;
  todoElement.querySelector(".edit").name = id;

  if (done) {
    todoElement.classList.add("completed");
  }

  return todoElement;
};
