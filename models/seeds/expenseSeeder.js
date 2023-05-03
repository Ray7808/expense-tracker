// const recordInfo = require('../recordSpend')
const userInfo = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const expenseInfo = require('./seedUserInfo.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
  },
]

db.once('open', () => {
  Promise.all(
    SEED_USER.map(async (user) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hash) =>
          userInfo.create({
            name: user.name,
            email: user.email,
            password: hash,
          })
        )
    })
  ).then(() => {
    console.log('done!')
    process.exit()
  })
})
