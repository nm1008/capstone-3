const express = require('express');
const router = express.Router();
const Record = require('./../models/record');
const RecordController = require ('./../controllers/record');
const auth = require('../auth');
// console.log(auth)

// add record
router.post('/', (req,res)=> {
	console.log(auth.decode())
	RecordController.add(req.body, auth.decode(req.headers.authorization)).then( result => res.send(result))
});
//get all records
router.get('/', (req,res)=> {
	RecordController.getAll().then(records => res.send(records));
});

//get records by ID
router.get('/:id', (req,res)=> {
	RecordController.get(req.params.id).then( result => res.send(result))
});



// update record
router.put('/', (req,res) => {
	RecordController.update(req.body).then( result => res.send(result))
});

//delete record by ID
router.delete('/:id', (req,res) => {
	RecordController.archive(req.params.id).then( result => res.send(result))
})




module.exports = router;

