const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address_line: {
			type: String,
		},
		city: {
			type: String,
		},
		zipcode: {
			type: String,
		},
		country: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Warehouse = mongoose.model("warehouse", schema);

exports.Warehouse = Warehouse;
exports.WarehouseSchema = schema;
