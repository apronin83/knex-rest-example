const { Model } = require("objection");
const BaseModel = require("./BaseModel");
//const Author = require("./Author");

class Todo extends BaseModel {
  static get tableName() {
    return "t_todos";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["text"],

      properties: {
        id: { type: "integer" },
        text: { type: "string", minLength: 1, maxLength: 255 },

        author: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" }
          }
        }
      }
    };
  }

//*
  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      author: {
        relation: Model.HasOneThroughRelation,
        
        // ВАЖНО!!!
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.

        //modelClass: Author, // BAD
        modelClass: __dirname + '/Author', // GOOD

        join: {
          from: "t_todos.id",
          through: {
            from: "t_author_todos.todo_id",
            to: "t_author_todos.author_id"
          },
          to: "t_authors.id"
        }
      }
    };
  }
//*/
}

module.exports = Todo;
