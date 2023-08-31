const Category = require('./../models/category');

//add category
module.exports.add = function(params,auth){
console.log(auth)
	let category = new Category ({
		type: params.type,
		description: params.description,
		userId: auth.id,

	})
	return category.save().then((category, err) => {
		if(err){
			return false
		}else{
			return true
		}
	})
}

module.exports.getAllActive = () => {
	return Category.find({isActive:true}).then(result => result)
}

//get all category
module.exports.getAllCategory = () => {

	return Category.find({}).then(result => result)

}

//get category by id
module.exports.get = (params) => Category.findById(params).then(result => result)

// delete category
module.exports.archive = params => {

	return Category.findByIdAndUpdate(params, {isActive: false})
	.then( (doc, err )=> {
		return err ? false : true
	})
}
