exports.up = function(knex, Promise) {
    return knex.schema
      .createTable("authors", t => {
        t.increments();
        t.string("name").notNullable();
        t.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
        t.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      })
      .createTable("author_todos", function(table) {
        table.increments("id");
        table.integer("author_id").notNullable().references("id").inTable("authors");
        table.integer("todo_id").notNullable().references("id").inTable("todos");
      });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("author_todos").dropTable("authors");
  };
