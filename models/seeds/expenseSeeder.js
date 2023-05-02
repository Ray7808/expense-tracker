// const recordInfo = require('../recordSpend')
const userInfo = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const expenseInfo = require('./seedUserInfo.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER_1 = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
}
const SEED_USER_2 = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER_1.password, salt))
    .then((hash) =>
      userInfo.create({
        name: SEED_USER_1.name,
        email: SEED_USER_1.email,
        password: hash,
      })
    )
  console.log('done!')
})
