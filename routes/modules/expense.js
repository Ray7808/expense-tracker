const express = require('express')
const router = express.Router()
const expenseInfo = require('../../models/expense')

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return expenseInfo
    .findOne({ _id, userId })
    .lean()
    .then((expense) => {
      console.log(expense.date)
      res.render('edit', { expense, _id })
    })
})

module.exports = router
