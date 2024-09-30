const express = require('express')
const { authenticate, authorize } = require('../Middlewares/authentication')
const { createUser, updatePermission, revokeAdminPermission  } = require('../Controllers/User.controller')
const adminRouter = express.Router()

adminRouter.post('/register', authenticate, authorize(['admin']), createUser)
adminRouter.put('/:email', authenticate, authorize(['admin']), updatePermission)
adminRouter.put('/:email', authenticate, authorize(['admin']), revokeAdminPermission)

module.exports = adminRouter