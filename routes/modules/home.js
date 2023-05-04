const express = require('express')
const router = express.Router()
const expenseInfo = require('../../models/expense')
const categoryInfo = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0

  expenseInfo
    .find({ userId })
    .lean()
    .then((expense) => {
      expense.map((eachExpense) => {
        totalAmount += eachExpense.amount
        const eachExpenseDate = eachExpense.date.toLocaleDateString()
        eachExpense['expenseDate'] = eachExpenseDate

        categoryInfo
          .find({ _id: eachExpense.categoryId })
          .lean()
          .then((category) => {
            const categoryClass = category[0].iconClass

            eachExpense['categoryClass'] = categoryClass
          })
      })
      return expense
    })
    .then((expense) => {
      res.render('index', { expense, totalAmount })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/sort/:sortingMethod', (req, res) => {
  //藉由輸入的query string，排序對應的花費資訊
  const userId = req.user._id
  const sortingMethod = req.params.sortingMethod

  switch (sortingMethod) {
    case 'home':
      return categoryInfo
        .find({ name: '家居物業' })
        .lean()
        .then((category) => {
          return expenseInfo
            .find({ userId, categoryId: category._id })
            .lean()
            .then((expense) => {
              console.log(expense)

              res.render('index', { expense: expense })
            })
            .catch((error) => console.log(error))
        })

    case 'car':
      return categoryInfo
        .find({ name: '交通出行' })
        .lean()
        .then((category) => {
          return expenseInfo
            .find({ userId, categoryId: category._id })
            .lean()
            .then((expenses) => {
              console.log(expenses)

              res.render('index', { expense: expenses })
            })
            .catch((error) => console.log(error))
        })

    case 'play':
      return categoryInfo
        .find({ name: '休閒娛樂' })
        .lean()
        .then((category) => {
          return expenseInfo
            .find({ userId, categoryId: category._id })
            .lean()
            .then((expenses) => {
              console.log(expenses)

              res.render('index', { expense: expenses })
            })
            .catch((error) => console.log(error))
        })

    case 'food':
      return categoryInfo
        .find({ name: '餐飲食品' })
        .lean()
        .then((category) => {
          return expenseInfo
            .find({ userId, categoryId: category._id })
            .lean()
            .then((expenses) => {
              console.log(expenses)
              res.render('index', { expense: expenses })
            })
            .catch((error) => console.log(error))
        })
    case 'others':
      return categoryInfo
        .find({ name: '其他' })
        .lean()
        .then((category) => {
          return expenseInfo
            .find({ userId, categoryId: category._id })
            .lean()
            .then((expenses) => {
              console.log(expenses)

              res.render('index', { expense: expenses })
            })
            .catch((error) => console.log(error))
        })
  }
})

module.exports = router
