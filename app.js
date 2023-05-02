const express = require('express')
const exhbs = require('express-handlebars')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

//Template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// middleware
app.use(express.static('public'))

app.use(routes)

app.listen(port, () => {
  console.log(`Now listening http://localhost:${port}`)
})
