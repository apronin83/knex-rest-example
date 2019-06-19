
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('author_todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('author_todos').insert([
        {id: 1, author_id: 1, todo_id: 1},
        {id: 2, author_id: 1, todo_id: 2},
        {id: 3, author_id: 1, todo_id: 3},
        {id: 4, author_id: 2, todo_id: 4}
      ]);
    });
};
