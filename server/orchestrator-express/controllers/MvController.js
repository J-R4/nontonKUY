const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const mvBaseURL = `http://localhost:4001/movies`
const tvBaseURL = `http://localhost:4002/series`

class MvController {
  static readM = async (req, res, next) => {
    try {
      const mvData = await redis.get('movies:data')
      if (mvData) {
        console.log(mvData, 'ini dari redis')

        const data = JSON.parse(mvData)
        res.status(200).json({data})
      } else {
        const mv = await 
          axios({
            method: 'get',
            url: mvBaseURL
          })
        
        const data = JSON.stringify(mv.data)
        redis.set('movies:data', data)
        console.log(data, 'ini dari else (axios)')

        res.status(200).json({data})
      }
    } catch (err) {
      next(err)
    }
  }

  static createM = async (req, res, next) => {
    try {
      console.log('masuk <<<<<<<<<<<')
      const { title, overview, popularity, poster_path, tags } = req.body
      const data = { title, overview, popularity, poster_path, tags }
      console.log(data)
      await redis.del('movies:data')
      const mv = await axios({
        method: 'post',
        url: mvBaseURL,
        data
      })
      console.log(mv, '<<<<<< mv')
      if (mv.data) {
        throw ({
          status: 400,
          message: 'Bad Request'
        })
      } else {
        res.status(201).json({data: mv.data})
      }
    } catch (err) {
      console.log(err, 'masuk <<<<<<<<<<< err')
      next(err)
    }
  }
}

module.exports = MvController