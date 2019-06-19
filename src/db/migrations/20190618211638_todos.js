exports.up = function(knex, Promise) {
    return knex.schema
      .createTable("t_authors", t => {
        t.increments();
        t.string("name").notNullable();
        t.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
        t.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      })
      .createTable("t_author_todos", function(table) {
        table.increments("id");
        table.integer("author_id").notNullable().references("id").inTable("t_authors");
        table.integer("todo_id").notNullable().references("id").inTable("t_todos");
      });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("t_author_todos").dropTable("t_authors");
  };
