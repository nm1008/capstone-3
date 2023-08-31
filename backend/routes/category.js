const express = require('express');
const router = express.Router();
const Category = require('./../models/category');
const CategoryController = require('./../controllers/category')
const auth = require('../auth')

// console.log(auth.decode())

//add category
router.post('/', (req,res)=> {
	console.log(req.headers.authorization)

	CategoryController.add(req.body, auth.decode(req.headers.authorization)).then( result => res.send(result))
});

//get all "isActive: true" category
router.get('/', (req,res)=> {
	CategoryController.getAllActive(req.body).then( result => res.send(result))
});


//get all category - isActive: true // false
router.get('/all', (req,res)=>{
	CategoryController.getAllCategory().then(result => res.send(result))
})


//delete category by ID
router.delete('/:id', (req,res) => {
	CategoryController.archive(req.params.id).then( result => res.send(result))
})
module.exports = router;