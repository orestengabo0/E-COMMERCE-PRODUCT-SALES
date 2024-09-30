const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

const hashPassword = async (plainPassword) => {
    try {
      const salt = await bcrypt.genSalt(10);
      await bcrypt.hash(plainPassword, salt);
    } catch (error) {
      console.error('Error hashing password:', error);
    }
};

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports.User = User