const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

//Template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true })) //拿到瀏覽器回傳的資料
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`Now listening http://localhost:${port}`)
})
