const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
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
