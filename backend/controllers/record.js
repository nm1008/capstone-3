
const Record = require('./../models/record');


//add record
module.exports.add = function(params, auth){

	let record = new Record({
		type: params.type,
		category: params.category,
		name: params.name,
		amount: params.amount,
		description: params.description,
		userId: auth.id
	})
	return record.save().then((record, err) => {
		if(err){
			return false
		}else{
			return true
		}
	})
}

//get all records
module.exports.getAll = function() {
	return Record.find().then(records => records)
}

//get record by ID
module.exports.get = (params) => Record.findById(params).then(record => record)


//update record
module.exports.update = params => {
	let { id, type, name, description, amount } = params
	return Record.findByIdAndUpdate(id, { type,name, description, amount}).then( (doc, err) => {
		return err ? false : true
	} )
}

//soft delete record
module.exports.archive = params => {

	return Record.findByIdAndUpdate(params, {isActive: false})
	.then( (doc, err )=> {
		return err ? false : true
	})
}


