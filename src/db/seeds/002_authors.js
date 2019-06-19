
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert([
        {id: 1, name: 'Pronin'},
        {id: 2, name: 'Gancev'}
      ]);
    });
};
