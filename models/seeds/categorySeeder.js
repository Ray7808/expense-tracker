const db = require('../../config/mongoose')
const categoryInfo = require('../category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const CATEGORY = [
  { name: '家居物業', iconUrl: 'https://fontawesome.com/icons/home?style=solid' },
  { name: '交通出行', iconUrl: 'https://fontawesome.com/icons/shuttle-van?style=solid' },
  { name: '休閒娛樂', iconUrl: 'https://fontawesome.com/icons/grin-beam?style=solid' },
  { name: '餐飲食品', iconUrl: 'https://fontawesome.com/icons/utensils?style=solid' },
  { name: '其他', iconUrl: 'https://fontawesome.com/icons/pen?style=solid' },
]

db.once('open', () => {
  Promise.all(
    CATEGORY.map((item) => {
      return categoryInfo.create({ name: `${item.name}`, iconUrl: `${item.iconUrl}` })
    })
  ).then(() => {
    console.log('done!')
    process.exit()
  })
})
