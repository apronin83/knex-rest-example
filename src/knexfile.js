// Update with your config settings.

const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.normalize(path.join(__dirname, "../.env")) });

//-------------------------------------------------

// Теперь можем использовать
// process.env.DB_NAME и др.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: path.normalize(path.join(__dirname, "/db/dev.sqlite3"))
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.normalize(path.join(__dirname, "/db/migrations"))
    },
    seeds: {
      directory: path.normalize(path.join(__dirname, "/db/seeds"))
    }
  }
};
