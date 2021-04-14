const { MongoClient } = require('mongodb')

let database = null

const connectMongoDB = (cb) => {
  // const uri = 'mongodb://localhost:27017'
  const uri = 'mongodb+srv://admin:admin@cluster0.cucg4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  client.connect()
    .then(() => {
      database = client.db('entertainme')
      cb(true)
    })
    .catch((err) => {
      cb(false)
    })
}

const getDatabase = () => {
  return database
}

module.exports = {
  connectMongoDB,
  getDatabase
}