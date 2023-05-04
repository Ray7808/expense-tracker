const express = require('express')
const router = express.Router()
const expenseInfo = require('../../models/expense')
const categoryInfo = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  const isCategory = [false, false, false, false, false]

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
            switch (category[0].name) {
              case '家居物業':
                isCategory[0] = true
                break
              case '交通出行':
                isCategory[1] = true
                break
              case '休閒娛樂':
                isCategory[2] = true
                break
              case '餐飲食品':
                isCategory[3] = true
                break
              case '其他':
                isCategory[4] = true
                break
            }
            eachExpense['categoryClass'] = categoryClass
          })
      })
      return expense
    })
    .then((expense) => {
      res.render('index', { expense, totalAmount, isCategory })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
