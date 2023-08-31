const User = require('../models/user');
const bcrypt = require('bcrypt');
const {createAccessToken} = require('./../auth.js');
const {OAuth2Client} = require('google-auth-library')
const nodemailer = require('nodemailer')

//google cliendID
const clientId="1029086215343-bskfcs9t9db4d3hfgcm14bekqf32ogjg.apps.googleusercontent.com"

//get all registered users
module.exports.getAllUsers = function() {
	return User.find().then( result => result)
}

//get details of user
module.exports.get = (params) => {
	return User.findById(params.userId).select({ password: 0}).then( user => {
		return user
	})
}

//if email exists
module.exports.emailExists = (params) => {
	return User.find({ email: params.email }).then(result => {
		return result.length > 0 ? true : false
	})
}


//register
module.exports.register = (params) => {
	let newUser = new User({
		firstName: params.firstName,
		lastName: params.lastName,
		email: params.email,
		mobileNo: params.mobileNo,
		password: bcrypt.hashSync(params.password, 10),
		loginType: "email"
	})

	return newUser.save().then((user, err) => {
		return (err) ? false : true
	})
}


//login
module.exports.login = (req,res) => {

	User.findOne({email: req.body.email}).then(user =>{
		if (!user ){
			res.send(false);
		}else{
			// res.send(user);
			let comparePasswordResult = bcrypt.compareSync(req.body.password ,user.password);
			if (!comparePasswordResult) {
				res.send(false);
			}else{
				res.send({accessToken: createAccessToken(user)})
			}
		}
	}).catch (err => {
		res.status(500).send("Server Error");
	})
}




module.exports.enroll = params => {
	return User.findById(params.userId).then( user => {
		user.enrollments.push( {courseId: params.courseId})
		return user.save().then((user) => {
			return Course.findById(params.courseId).then( course => {
				course.enrollees.push({userId: params.userId})
				return course.save().then( course => {
					return course ? true: false
				})
			})
		})
	})
}


//update user details
module.exports.update = params => {
	let { id, firstName, lastName, mobileNo, email } = params
	return User.findByIdAndUpdate(id, { firstName, lastName, mobileNo, email}).then( (doc, err) => {
		return err ? false : true
	} )
}

//Google Login
module.exports.verifyGoogleTokenId = async (tokenId,googleAccessToken) => {

	//console.log(tokenId)
	console.log(googleAccessToken)

	//create a new OAuth2Client with our clientId for identification and authorization to use OAuth2
	const client = new OAuth2Client(clientId)
	const data = await client.verifyIdToken({idToken: tokenId, audience: clientId})
	//audience and idToken are required to check your user's google login token and your clientId side by side to check if it's legitimate and is coming from a recognizable source.

	//Let's check if we can receive verified data:
	//console.log(data)

	//Run this if the email from the data payload is verified
	if(data.payload.email_verified === true){

		//We're going to check if the user's email has already been registered in our database. 
		//.exec() in mongoose, works like your .then() and that it allows the execution of the following statements.

		const user = await User.findOne({email: data.payload.email}).exec()

		//console.log(user)

		/*
			If the user variable logs null, then the user has not registered in our db yet.
			If the user variable logs details then the user has already registered.
		*/
		if(user !== null){

			console.log("A user with the same email has been registered.")
			console.log(user)
			/*
				This will run if the the user variable does not log null, and instead contains the user details. Which means, a user with the same email has been registered. However, we will now check if the registered user used google login to register or used our regular registration to register. 

				If the email has already been used by registering through our regular registration we will send an error message.

			*/
			if(user.loginType === "google"){

				return {accessToken: createAccessToken(user)}

			} else {

				/*This means our user registered through the registration page before using the same gmail he/she is trying to login using the google login button.*/
				return {error: 'login-type-error'}

			}

		} else {

			//this will run if the google login user logged onto our web app for the first time.
			//we will register his/her details into our database.
			console.log(data.payload)
			const newUser = new User({

				firstName: data.payload.given_name,
				lastName: data.payload.family_name,
				email: data.payload.email,
				loginType: "google"

			})

			//save our new user into the db:
			return newUser.save().then((user,err)=>{
				/*
					Email Sending Feature:

					Send an email to our user thanking them for registering to our Next Booking System.

				*/

				/*
					MailOptions = will be the content of the email we're going to send to our user. This will include the message, email address of the sender, and email address of recipient.

				*/

				const mailOptions = {
					//the email address of the sender:
					from: 'mallari088nikko@gmail.com',
					to: user.email, //we get this from the newly registered user.
					subject: 'Thank you for registering to Next Booking System',
					text: `You registered to Next Booking System on ${new Date().toLocaleString()}`,
					html: `You registered to Next Booking System on ${new Date().toLocaleString()}`
				}

				/*
					We're going to pass details to our nodemailer by sending authorizations and tokens so that we don't have to use or hard code our email sender credentials.
				*/

				const transporter = nodemailer.createTransport({

					host: 'smtp.gmail.com',
					port: 465,
					secure: true,
					auth: {
						type: 'OAuth2',
						user: process.env.MAILING_SERVICE_EMAIL, //get our email from the local environment variable
						clientId: process.env.MAILING_SERVICE_CLIENT_ID,
						clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
						refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
						accessToken: googleAccessToken
					}

				})

				//create a function to send our mail:
				//use transporter as the params to send our email with the proper authorizations:
				function sendMail(transporter){
					//use nodemailer transport's sendMail method to send the email.
					//check if there is an error sending the email.
					//or check the result of the email sending.
					transporter.sendMail(mailOptions, function (err,result){

						if(err){

							console.log(err)
							transporter.close()

						} else if (result) {

							console.log(result)
							transporter.close()

						}

					})

				}

				//use the sendMail function to send an email to the user:
				//with the transporter as an argument to the sendMail function.
				sendMail(transporter)

				//create our new user an accesstoken to immediately login
				return {accessToken: createAccessToken(user)}

			})


		}

		/*
			Push our updates and changes to next_booking
			"includes email sending feature"
			
			link the repo to:

			WD058-19 Product Integration B: Email Sending Feature


		*/


	} else {

		//this will run if somehow, the google tokenId given has an error or is more than legitimate
		
		return {error: "google-auth-error"}


	}

}