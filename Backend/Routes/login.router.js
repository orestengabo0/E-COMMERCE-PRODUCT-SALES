const express = require('express')
const {loginUser} = require('../Controllers/User.controller')
const loginRoute = express.Router()

loginRoute.post('/', loginUser)

module.exports = loginRoute