exports.up = function (knex, Promise) {
	return knex.schema.createTable("t_todos", t => {
		t.increments();
		t.string("text");
		t.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
		t.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable("t_todos");
};