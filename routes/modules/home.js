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
        if (eachExpense['expenseDate'] == undefined) {
          const eachExpenseDate = eachExpense.date.toLocaleDateString()
          eachExpense['expenseDate'] = eachExpenseDate
        }
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
  const category = selectedCategory(sortingMethod)
  let totalAmount = 0

  return expenseInfo
    .find({ userId, categoryClass: category })
    .lean()
    .then((expense) => {
      expense.map((eachExpense) => {
        totalAmount += eachExpense.amount
        if (eachExpense['expenseDate'] == undefined) {
          const eachExpenseDate = eachExpense.date.toLocaleDateString()
          eachExpense['expenseDate'] = eachExpenseDate
        }
      })
      return expense
    })
    .then((expense) => {
      res.render('index', { expense, totalAmount })
    })
    .catch((error) => console.log(error))
})

module.exports = router

function selectedCategory(sortingMethod) {
  switch (sortingMethod) {
    case 'home':
      return 'fa-solid fa-house'
    case 'car':
      return 'fa-solid fa-van-shuttle'
    case 'play':
      return 'fa-solid fa-face-grin-beam'
    case 'food':
      return 'fa-solid fa-utensils'
    case 'others':
      return 'fa-solid fa-pen'
  }
}
