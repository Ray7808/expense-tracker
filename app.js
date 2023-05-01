const express = require('express')
const exhbs = require('express-handlebars')

require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

//Template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Now listening http://localhost:${port}`)
})
