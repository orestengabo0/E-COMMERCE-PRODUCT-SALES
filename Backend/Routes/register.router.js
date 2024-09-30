const express = require('express')
const { createUser } = require('../Controllers/User.controller')
const registerRoute = express.Router()

registerRoute.post('/', createUser)

module.exports = registerRoute
