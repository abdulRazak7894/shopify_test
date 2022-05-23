const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			default: 0,
			required: true,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
		},
		warehouse: {
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("product", schema);

exports.Product = Product;
exports.ProductSchema = schema;
