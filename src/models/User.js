const { Model } = require("objection");
const BaseModel = require("./BaseModel");

class User extends BaseModel {
  static get tableName() {
    return "t_users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 50 },
        email: { type: "string", minLength: 1, maxLength: 50 },
        password: { type: "string", minLength: 1, maxLength: 50 }
      }
    };
  }
}

module.exports = User;
