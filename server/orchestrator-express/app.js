const express = require('express')
const app = express()

const {connectMongoDB} = require('./config/mongodb.js')
const port = process.env.PORT || 4000

const router = require('./routes/index.js')

const errHandler = require('./middlewares/errHandler.js')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', router)
app.use(errHandler)

app.listen(port, () => {
  console.log('Orchestrator Express is running on port: ' + port)
})

connectMongoDB((connect) => {
  if (connect) {
    console.log('mongodb successfully connected !')
  } else {
    console.log('error in mongodb connecting !')
  }
})