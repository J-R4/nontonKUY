const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const mvBaseURL = `http://localhost:4001/movies`
const tvBaseURL = `http://localhost:4002/tv`

class TvController {
  static read = async (req, res, next) => {
    try {
      const data = await Promise.all([redis.get('movies:data'), redis.get('tv:data')])
      if (data) {
        console.log(data, 'ini dari redis')
      } else {
        const data = await Promise.all([
          axios({
            method: 'get',
            url: mvBaseURL
          }),
          axios({
            method: 'get',
            url: tvBaseURL
          })
        ])
        console.log(data, 'ini dari else (axios)')
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TvController