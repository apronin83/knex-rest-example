const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const { Model } = require('objection');

//-----------------------------------------

dotenv.config();

//-----------------------------------------

const knexConnection = require('./db/config');

Model.knex(knexConnection);

//-----------------------------------------

const app = express();

app.use(bodyParser.json());

//-----------------------------------------


app.get("/todos", async (req, res) => {

    console.log('Inner GET TODOS');

	const Todo = require("./model/Todo");

	const todo = await Todo.query().findOnce({
			id: 1
		});

	if (todo) {
		res.json({
			todos: [{
					id: todo.id,
					text: todo.text
				}
			]});
	} else {
		re.status(404).json({});
	}
});

//-----------------------------------------

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

//-----------------------------------------

module.exports = app;
