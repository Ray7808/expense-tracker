const express = require('express')
const router = express.Router()
const expenseInfo = require('../../models/expense')
const categoryInfo = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return expenseInfo
    .findOne({ _id, userId })
    .lean()
    .then((expense) => {
      res.render('edit', { expense, _id })
    })
})

router.post('/new', (req, res) => {
  res.redirect('/')
})
router.post('/:id/edit', (req, res) => {
  //根據動態路由輸入的id，將編輯後的資料傳至mongoDB並重新導向到edit.hbs
  const _id = req.params.id
  const userId = req.user._id

  return categoryInfo
    .findOne({ name: req.body.category })
    .then((category) => {
      return expenseInfo.findOne({ _id, userId }).then((expense) => {
        expense.name = req.body.name
        expense.date = req.body.date
        expense.amount = req.body.amount
        expense.categoryId = category._id
        return expense.save()
      })
    })
    .then(() => res.redirect(`/`))
    .catch((error) => console.log(error))
})

module.exports = router
