const express = require('express')
const { authenticate, authorize } = require('../Middlewares/authentication')
const { updatePermission, revokeAdminPermission  } = require('../Controllers/User.controller')
const adminRouter = express.Router()

adminRouter.put('/grant/:email', authenticate, authorize(['admin']), updatePermission)
adminRouter.put('/revoke/:email', authenticate, authorize(['admin']), revokeAdminPermission)

module.exports = adminRouter