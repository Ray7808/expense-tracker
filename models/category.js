const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new mongoose.Schema({
  //設置餐廳的各個資訊
  name: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  iconClass: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Category', categorySchema)
