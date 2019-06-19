const { Model } = require("objection");
const BaseModel = require("./BaseModel");
const Todo = require("./Todo");

class Author extends BaseModel {
//class Author extends Model {
  static get tableName() {
    return "t_authors";
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
        relation: Model.ManyToManyRelation, //Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: "t_authors.id",
          // Relation needs the `through` object to describe the join table.
          through: {
            from: "t_author_todos.author_id",
            to: "t_author_todos.todo_id"
          },
          to: "t_todos.id"
        }
      }
    };
  }
}

module.exports = Author;