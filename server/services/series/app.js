const express = require('express')
const app = express()

const {connectMongoDB} = require('./config/mongodb.js')
const port = process.env.PORT || 4002

const errHandler = require('./middlewares/errHandler.js')

const router = require('./routes/index.js')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/series', router)
app.use(errHandler)

app.listen(port, () => {
  console.log('Series App is running on port: ' + port)
})

connectMongoDB((connect) => {
  if (connect) {
    console.log('mongodb successfully connected !')
  } else {
    console.log('error in mongodb connecting !')
  }
})