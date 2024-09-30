const express = require('express')
const { authenticate, authorize } = require('../Middlewares/authentication')
const { createUser  } = require('../Controllers/User.controller')
const adminRouter = express.Router()

adminRouter.post('/register', authenticate, authorize(['admin']), createUser)

module.exports = adminRouter