const Redis = require("ioredis")
const redis = new Redis()
const axios = require("axios")

const mvBaseURL = `http://localhost:4001/movies/`

const resolvers = {
  Query : {
    movies: async () => {
      try {
        const mvData = await redis.get('movies:data')
        if (mvData) {
          return JSON.parse(mvData)
        } else {
          const { data } = await axios({
            method: 'get',
            url: mvBaseURL
          })
          await redis.set('movies:data', JSON.stringify(data))
          return data
        }
      } catch (err) {
        console.log(err)
      }
    },
    movie: async (_, args) => {
      try {
        await redis.del('movie:data')
        const mvData = await redis.get('movie:data')
        if (mvData) {
          return JSON.parse(mvData)
        } else {
          const { id } = args
          const { data } = await axios({
            method: 'get',
            url: mvBaseURL + id
          })
          await redis.set('movie:data', JSON.stringify(data))
          return data
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  Mutation : {
    createMovie: async (_, args) => {
      try {
        await redis.del('movies:data')
        await redis.del('movie:data')
        const { title, overview, poster_path, popularity, tags } = args
        const mvData = { title, overview, poster_path, popularity, tags }
        const { data } = await axios({
          method: 'post',
          url: mvBaseURL,
          data: mvData
        })
        return data
      } catch (err) {
        console.log(err)
      }
    },
    editMovie: async (_, args) => {
      try {
        await redis.del('movies:data')
        await redis.del('movie:data')
        const { id, title, overview, poster_path, popularity, tags } = args
        const mvData = { title, overview, poster_path, popularity, tags }
        const { data } = await axios({
          method: 'put',
          url: mvBaseURL + id,
          data: mvData
        })
        return data
      } catch (err) {
        console.log(err)
      }
    },
    deleteMovie: async (_, args) => {
      try {
        await redis.del('movies:data')
        await redis.del('movie:data')
        const { id } = args
        const { data } = await axios({
          method: 'delete',
          url: mvBaseURL + id
        })
        return data
      } catch (err) {
        console.log(err)
      }
    }
  }
}

module.exports = resolvers