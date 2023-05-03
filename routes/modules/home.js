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

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/edit', (req, res) => {
  res.render('edit')
})
router.post('/new', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})
router.post('/edit', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

module.exports = router
