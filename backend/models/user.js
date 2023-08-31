const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required.']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        // unique: [true, 'Email is already in use']
    },
    password: {
        type: String,
       
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    mobileNo: {
        type: String,
    },
    loginType: {

        type: String,
        

    },
  
})

module.exports = mongoose.model('User', userSchema)