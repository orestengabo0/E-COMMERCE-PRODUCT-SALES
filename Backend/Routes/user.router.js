const express = require('express')
const { createUser } = require('../Controllers/User.controller.js')
const userRoute = express.Router()

userRoute.post('/register', createUser)

module.exports = userRoute