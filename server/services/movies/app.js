const express = require('express')
const app = express()

const {connectMongoDB} = require('./config/mongodb.js')
const port = process.env.PORT || 4001

const errHandler = require('./middlewares/errHandler.js')

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

app.use('/movies', router)
app.use(errHandler)

app.listen(port, () => {
  console.log('Movies App is running on port: ' + port)
})