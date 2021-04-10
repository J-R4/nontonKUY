const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Movie{
  static read() {
    return getDatabase().collection('movies').find().toArray()
  }

  static create(movie) {
    return getDatabase().collection('movies').insertOne(movie)
  }

  static update(id, movie) {
    return getDatabase()
      .collection('movies')
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            title: movie.title,
            overview: movie.overview,
            popularity: movie.popularity,
            poster_path: movie.poster_path,
            tags: movie.tags
          }
        },
        {
          $unset: movie.tags
        }
      )
  }

  static delete(id) {
    return getDatabase()
      .collection('movies')
      .deleteOne({_id: ObjectId(id)})
  }

  static readOne(id) {
    return getDatabase()
      .collection('movies')
      .readOne({_id: ObjectId(id)})
  }
}

module.exports = Movie