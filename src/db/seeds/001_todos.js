
exports.seed = function (knex, Promise) {
	// Deletes ALL existing entries
	return knex('t_todos').del()
	.then(function () {
		// Inserts seed entries
		return knex('t_todos').insert([{
					id: 1,
					text: 'todo 1'
				}, {
					id: 2,
					text: 'todo 2'
				}, {
					id: 3,
					text: 'todo 3'
				}, {
					id: 4,
					text: 'todo 4'
				}
			]);
	});
};
