const express = require('express')
const app = express()

const {connectMongoDB} = require('./config/mongodb.js')
const port = process.env.PORT || 3000

const router = require('./routes/index.js')

connectMongoDB((connect) => {
  if (connect) {
    console.log('mongodb successfully connected !')
  } else {
    console.log('error in mongodb connecting !')
  }
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', router)

app.listen(port, () => {
  console.log('this app is running on port: ' + port)
})