const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
	//either income or expense -
	type: {
		type: String
	},

	category: {
		type: String
	},
	//record name
	name: {
			type: String,
			trim: true,
			required : [true, "Record name is required"]
	},
	//amount of income/expense
	amount: {

			type: Number,
			required : [true, "Amount is required"]
	},
	//type of category (income or expense)
	description : {

		type: String,
		required : [true, "Description is required"]
	},
	isActive : {
		type: Boolean,
		default: true	
	},
	userId: {
		type: String,
		required: [true, "User Id is required"]
		},
	addedOn:{
				type: Date,
				default: new Date()
		}
	
	
})


module.exports = mongoose.model('Record', recordSchema);

