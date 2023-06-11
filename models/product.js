var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var ProductSchema = mongoose.Schema({
	title: {
		type: String,
		index: true
	},
	titleen: {
		type: String,
		index: true
	},
	description: {
		type: String,
		index: true
	},
	category: {
		type: String
	},
	image:{
		type: String
	},
	image_mime:{
		type: String
	},
	price: {
		type: String
	},
	discount: {
		type: String
	},
	discountprice: {
		type: String
	},
	createdby: {
		type: String
	},
	createdat: {
		type: String
	}
});

var Product = module.exports = mongoose.model('Product', ProductSchema);