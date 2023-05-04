const express = require('express')
const router = express.Router()
const expenseInfo = require('../../models/expense')
const categoryInfo = require('../../models/category')
const { each } = require('mongodb/lib/operations/cursor_ops')

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

module.exports = router
