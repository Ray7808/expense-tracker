const express = require('express')
const router = express.Router()
const expenseInfo = require('../../models/expense')
const categoryInfo = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/new', (req, res) => {
  const userId = req.user._id

  const category = req.body.category

  return categoryInfo
    .find({ name: `${category}` })
    .lean()
    .then((categoryContent) => {
      const categoryId = categoryContent[0]._id
      return expenseInfo.create({
        name: `${req.body.name}`,
        date: `${req.body.date}`,
        amount: `${req.body.amount}`,
        userId,
        categoryId,
      })
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
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

router.post('/:id/edit', (req, res) => {
  //根據動態路由輸入的id，將編輯後的資料傳至mongoDB並重新導向到index.hbs
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
