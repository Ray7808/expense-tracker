const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new mongoose.Schema({
  //設置餐廳的各個資訊
  name: {
    type: String,
    required: true,
  },
  TypeId: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Category', categorySchema)
