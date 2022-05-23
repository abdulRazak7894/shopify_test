"use strict";

const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = function (collection) {
	const schema = {
		mixins: [DbService],
	};

	// Mongo adapter
	const uri = process.env.MONGO_URI || "mongodb://localhost/pdfpsy";

	schema.adapter = new MongooseAdapter(`${uri}?retryWrites=true&w=majority`, {
		useUnifiedTopology: true,
	});
	schema.collection = collection;

	return schema;
};
