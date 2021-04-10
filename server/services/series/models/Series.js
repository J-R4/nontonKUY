const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Series{
  static read() {
    return getDatabase().collection('series').find().toArray()
  }

  static create(series) {
    return getDatabase().collection('series').insertOne(series)
  }

  static update(id, series) {
    return getDatabase()
      .collection('series')
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            title: series.title,
            overview: series.overview,
            popularity: series.popularity,
            poster_path: series.poster_path,
            tags: series.tags
          }
        },
        {
          $unset: series.tags
        }
      )
  }

  static delete(id) {
    return getDatabase()
      .collection('series')
      .deleteOne({_id: ObjectId(id)})
  }

  static readOne(id) {
    return getDatabase()
      .collection('series')
      .findOne({_id: ObjectId(id)})
  }
}

module.exports = Series