
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('t_authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('t_authors').insert([
        {id: 1, name: 'Pronin'},
        {id: 2, name: 'Gancev'}
      ]);
    });
};
