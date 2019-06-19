const environment = process.env.NODE_ENV || 'development';

/* 

// Short code

const config = require('../knexfile')[environment];

module.exports = require('knex')(config);
*/

// OR Detailed code

const Knex = require("knex");
const connection = require("../knexfile");

console.log('BEGIN CONFIG');
console.log(connection[environment]);
console.log('END CONFIG');

const knexConnection = Knex(connection[environment]);

module.exports = knexConnection;