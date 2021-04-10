const Series = require("../models/Series")
const Redis = require("ioredis")
const redis = new Redis()

class SeriesController {
  static readS = async (req, res, next) => {
    try {
      const sData = await redis.get('series:data')

      if (sData) {
        const data = JSON.parse(sData)
        res.status(200).json(data)
      } else {
        const s = await Series.read()
        const data = JSON.stringify(s)
        redis.set('series:data', data)
        res.status(200).json(s)
      }
    } catch (err) {
      next(err)
    }
  }

  static createS = async (req, res, next) => {
    try {
      await redis.del('series:data')
      const s = await Series.create(req.body)
      res.status(201).json(s)
    } catch (err) {
      next(err)
    }
  }

  static readOneS = async (req, res, next) => {
    try {
      const s = await Series.readOne(req.params.id)
      res.status(200).json(s)
    } catch (err) {
      next(err)
    }
  }

  static updateS = async (req, res, next) => {
    try {
      await redis.del('series:data')
      const updates = await Series.update(req.params.id, req.body)
      res.status(200).json(updates)
    } catch (err) {
      next(err)
    }
  }

  static deleteS = async (req, res, next) => {
    try {
      await redis.del('series:data')
      const s = await Series.delete(req.params.id)
      res.status(200).json(s)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = SeriesController