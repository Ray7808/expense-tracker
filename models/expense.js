const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new mongoose.Schema({
  //設置餐廳的各個資訊
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    index: true,
  },
})

module.exports = mongoose.model('expenseInfo', expenseSchema)
