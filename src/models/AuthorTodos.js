const { Model } = require("objection");
const Todo = require("./Todo");

class AuthorTodos extends Model {
  static get tableName() {
    return "t_author_todos";
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      todos: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: "t_author_todos.todo_id",
          to: "t_todos.id"
        }
      }
    };
  }
}

module.exports = AuthorTodos;
