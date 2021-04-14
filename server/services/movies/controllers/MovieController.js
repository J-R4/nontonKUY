const Movie = require("../models/Movie")
const Redis = require("ioredis")
const redis = new Redis()

class MovieController {
  static readM = async (req, res, next) => {
    try {
      const mvData = await redis.get('movies:data')
      if (mvData) {
        const data = JSON.parse(mvData)
        res.status(200).json(data)
      } else {
        const mv = await Movie.read()
        const data = JSON.stringify(mv)
        redis.set('movies:data', data)
        res.status(200).json(mv)
      }
    } catch (err) {
      next(err)
    }
  }

  static createM = async (req, res, next) => {
    try {
      await redis.del('movies:data')
      const mv = await Movie.create(req.body)
      res.status(201).json(mv.ops[0])
    } catch (err) {
      next(err)
    }
  }

  static readOneM = async (req, res, next) => {
    try {
      redis.del('movie:data')
      const mv = await Movie.readOne(req.params.id)
      res.status(200).json(mv)
    } catch (err) {
      next(err)
    }
  }

  static updateM = async (req, res, next) => {
    try {
      await redis.del('movies:data')
      const updateMv = await Movie.update(req.params.id, req.body)
      res.status(200).json({message: 'Update Successfully !'})
    } catch (err) {
      next(err)
    }
  }

  static deleteM = async (req, res, next) => {
    try {
      await redis.del('movies:data')
      const mv = await Movie.delete(req.params.id)
      res.status(200).json({message: 'Delete Successfully !'})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = MovieController