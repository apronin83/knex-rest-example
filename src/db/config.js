const environment = process.env.NODE_ENV || 'development';

/* 

// Short code

const config = require('../knexfile')[environment];

module.exports = require('knex')(config);
*/

// OR Detailed code

const Knex = require("knex");
const connection = require("../knexfile");

const knexConnection = Knex(connection[environment]);

module.exports = knexConnection;