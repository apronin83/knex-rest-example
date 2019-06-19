const BaseModel = require("./BaseModel");

class Author extends BaseModel {
  static get tableName() {
    return "authors";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 50 }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      todos: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: 'authors.id',
          // Relation needs the `through` object to describe the join table.
          through: {
            from: 'author_todos.author_id',
            to: 'author_todos.todo_id'
          },
          to: 'todos.id'
        }
      }
    };
  }
}

module.exports = Todo;