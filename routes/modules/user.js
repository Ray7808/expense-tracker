const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

//設定路由
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err) // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      req.flash('warning_msg', '請重新輸入正確的內容')
      return res.redirect('/users/login')
    }
    req.login(user, function (err) {
      if (err) {
        return next(err)
      }
      return res.redirect('/')
    })
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    })
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email })
    .then((user) => {
      // 如果已經註冊，退回原本畫面
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword,
        })
      }
      // 如果還沒註冊：寫入資料庫
      return bcrypt
        .genSalt(10) // 加鹽，複雜度係數是10
        .then((salt) => bcrypt.hash(password, salt)) // 為使用者密碼加鹽並產生雜湊值
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash,
          })
        )
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
