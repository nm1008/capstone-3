const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

	//either income or expense
	type: {
		type:String
	},

	//description of the category
	description: {
		type:String,
		required: [true, "Description is needed"]
	},
	isActive : {
		type: Boolean,
		default: true	
	},

	userId: {
		type:String,
		required: [true, "UserId is required"]
	},
	addedOn: {
		type:Date,
		default: new Date()
	}
	

})

module.exports = mongoose.model('Category', categorySchema)