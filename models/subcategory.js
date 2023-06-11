var mongoose = require('mongoose');

// User Schema
var SUbCategorySchema = mongoose.Schema({
	title: {
		type: String,
		index:true
	},
	titleen: {
		type: String,
		index: true
	},
	description: {
		type: String,
		index:true
    },
    category:{
        type: String,
        index: true
    },
	date:{
		type: Date
	}
});

var SubCategory = module.exports = mongoose.model('SubCategory', SUbCategorySchema);