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
      const categoryClass = categoryContent[0].iconClass
      return expenseInfo.create({
        name: `${req.body.name}`,
        date: `${req.body.date}`,
        amount: `${req.body.amount}`,
        userId,
        categoryClass,
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
      const categoryClass = expense.categoryClass
      if (expense['expenseDate'] == undefined) {
        const expenseDate = expense.date.toLocaleDateString()
        expense['expenseDate'] = expenseDate
      }
      const category = whichCategory(expense.categoryClass)
      expense['category'] = category

      res.render('edit', {
        expense,
        _id,
        isHouse: isHouse(categoryClass),
        isCar: isCar(categoryClass),
        isPlay: isPlay(categoryClass),
        isFood: isFood(categoryClass),
        isOthers: isOthers(categoryClass),
      })
    })
})

router.put('/:id/edit', (req, res) => {
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
        expense.categoryClass = category.iconClass
        return expense.save()
      })
    })
    .then(() => res.redirect(`/`))
    .catch((error) => console.log(error))
})

router.delete('/:id/delete', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  return expenseInfo
    .findOne({ _id, userId })
    .then((expense) => expense.deleteOne())
    .then(() => res.redirect('/'))
})

module.exports = router

function isHouse(categoryClass) {
  // 是否為家居物業
  if (categoryClass === 'fa-solid fa-house') {
    return true
  }
  return false
}
function isCar(categoryClass) {
  // 是否為交通出行
  if (categoryClass === 'fa-solid fa-van-shuttle') {
    return true
  }
  return false
}
function isPlay(categoryClass) {
  // 是否為休閒娛樂
  if (categoryClass === 'fa-solid fa-face-grin-beam') {
    return true
  }
  return false
}
function isFood(categoryClass) {
  // 是否為餐飲食品
  if (categoryClass === 'fa-solid fa-utensils') {
    return true
  }
  return false
}
function isOthers(categoryClass) {
  // 是否為其他
  if (categoryClass === 'a-solid fa-pen') {
    return true
  }
  return false
}
function whichCategory(categoryClass) {
  switch (categoryClass) {
    case 'fa-solid fa-house':
      return '家居物業'
    case 'fa-solid fa-van-shuttle':
      return '交通出行'
    case 'fa-solid fa-face-grin-beam':
      return '休閒娛樂'
    case 'fa-solid fa-utensils':
      return '餐飲食品'
    case 'a-solid fa-pen':
      return '其他'
  }
}
