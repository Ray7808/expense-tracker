const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/user')
const expense = require('./modules/expense')

const { authenticator } = require('../middleware/auth') // 加入middleware

router.use('/expense', authenticator, expense)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router
