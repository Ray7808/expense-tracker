const express = require('express')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('This is the test')
})

app.listen(port, () => {
  console.log(`Now listening http://localhost:${port}`)
})
