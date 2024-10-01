const express = require('express')
const { authenticate } = require('../Middlewares/authentication')
const { addToCart } = require('../Controllers/Cart.controller')
const cartRoute = express.Router()

cartRoute.post("/add", authenticate, addToCart)

module.exports = cartRoute