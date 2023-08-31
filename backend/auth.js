const jwt = require('jsonwebtoken');
const secret = "SecretCourseBookingApi";

module.exports.createAccessToken = (user) =>{
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret);
}

module.exports.verify = (req,res,next)=>{
if(req.headers.authorization){

		let token = req.headers.authorization
		token = token.slice(7,token.length)

		let result = jwt.verify(token, secret, (err, data)=>{
			return data;
		})
		if (result){
			next();
		}else{
			res.send({auth: "failed"});
		}

	}else{
		res.send({auth: "failed"})
	}
	
}

module.exports.decode = (token) => {
	if( token ) {
		token = token.slice(7, token.length)
		return jwt.verify(token, secret, (err, data) => {
			return err ? null : jwt.decode(token, {complete: true}).payload
		})
	} else {
		return null
	}
}
