class Todo {
  /**
   *
   * @param {string} description
   */
  constructor(description) {
    this.id = 1; // TODO: Esto eventualmente se cambiará.
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
  }
}
