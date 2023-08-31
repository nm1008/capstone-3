const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user');
const auth = require('./../auth');

//get all users
router.get('/', (req,res) => {
	userController.getAll().then(result => res.send(result));
})

//get user details
router.get('/details', auth.verify, (req,res) => {
	const decodedToken = auth.decode(req.headers.authorization)
	userController.get({ userId : decodedToken.id}).then( user => res.send( user))
})

//email exists
router.post('/email-exists', (req, res) => {
	userController.emailExists(req.body).then(result => res.send(result))
})

//register
router.post('/', (req, res) => {
	userController.register(req.body).then(result => res.send(result))
})

//login
router.post('/login', (req,res) =>{
	userController.login(req,res)
})

// enroll
router.post('/enroll', auth.verify,(req,res) => {
	// userId = get this in token
	// courseId = body
	const params = {
		userId: auth.decode(req.headers.authorization).id,
		courseId: req.body.courseId
	}

	userController.enroll(params).then( result => res.send(result))
})

//update user
router.put('/', auth.verify, (req,res) => {
	userController.update(req.body).then( result => res.send(result))
});

//google login
router.post('/verify-google-id-token', async (req,res)=> {

	res.send(await userController.verifyGoogleTokenId(req.body.tokenId,req.body.accessToken))

})

module.exports = router;

module.exports = router;
