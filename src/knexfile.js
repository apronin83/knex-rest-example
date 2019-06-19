// Update with your config settings.

const dotenv = require("dotenv");

dotenv.config({ path: "../.env"});

// Теперь можем использовать 
// process.env.DB_NAME и др.

module.exports = {

	development: {
		client: 'sqlite3',
		connection: {
			filename: './db/dev.sqlite3'
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./db/migrations"
		},
		seeds: {
			directory: "./db/seeds"
		}
	}
};
