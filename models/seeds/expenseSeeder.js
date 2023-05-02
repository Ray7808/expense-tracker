const recordInfo = require('../recordSpend')
const userInfo = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const expenseInfo = require('./seedInfo.json')

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
        email: SEED_USER_1.email,
        password: hash,
      })
    )
    .then((user1) => {
      const userId = user1._id
      return Promise.all(
        Array.from({ length: 2 }, (_, i) =>
          recordInfo.create({
            name: `${expenseInfo.results[i].name}`,
            date: `${expenseInfo.results[i].date}`,
            amount: `${expenseInfo.results[i].amount}`,
            userId: userId,
            categoryId: `${expenseInfo.results[i].categoryId}`,
          })
        )
      )
    })
})
