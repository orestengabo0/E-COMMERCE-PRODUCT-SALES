const mongoose = require('mongoose')
const { hashPassword } = require('../Security/hashPasswords')
 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 255
    },
    role: {
        type: String,
        enum: ['user','admin'], 
        default: 'user'
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports.User = User