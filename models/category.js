var mongoose = require('mongoose');

// User Schema
var CategorySchema = mongoose.Schema({
	title: {
		type: String,
		index:true
	},
	titleen: {
		type: String,
		index:true
	},
	description: {
		type: String,
		index:true
	},
	date:{
		type: Date
	}
});

var Category = module.exports = mongoose.model('Category', CategorySchema);