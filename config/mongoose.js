const mongoose = require('mongoose')
// 僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//連線到mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// db測試
const db = mongoose.connection
db.on('error', () => {
  console.log('mondodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
