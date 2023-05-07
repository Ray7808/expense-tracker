// const recordInfo = require('../recordSpend')
const userInfo = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const expenseInfo = require('../expense')
const seedExpenseInfo = require('./seedExpenseInfo.json')
const categoryInfo = require('../category')

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
  // 先建立 user information
  const users_id = []
  Promise.all(
    SEED_USER.map((user) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hash) => {
          return userInfo.create({
            name: user.name,
            email: user.email,
            password: hash,
          })
        })
        .then((user) => {
          const userId = user._id
          users_id.push(userId)
        })
    })
  )
    .then(() => {
      //根據建立好的user id以及 category id，建立expense information

      return Promise.all(
        seedExpenseInfo.map((expense) => {
          //根據expenseInfo的id對應的userId
          let userId = {}
          if (expense.id === 1) {
            userId = users_id[0]
          } else if (expense.id === 2) {
            userId = users_id[1]
          }
          const category = expense.category

          return categoryInfo
            .find({ name: `${category}` })
            .lean()
            .then((categoryContent) => {
              const categoryClass = categoryContent[0].iconClass
              expenseInfo.create({
                name: `${expense.name}`,
                date: expense.date,
                amount: expense.amount,
                userId,
                categoryClass,
              })
            })
            .catch((err) => console.log(err))
        })
      )
    })
    .then(() => {
      // 全部完成就中止這隻程式
      console.log('done!')
      process.exit()
    })
})
