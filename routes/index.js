const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/user')

const { authenticator } = require('../middleware/auth') // 加入middleware

router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router
