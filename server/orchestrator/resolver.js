const Redis = require("ioredis")
const redis = new Redis()
const axios = require("axios")

const mvBaseURL = `http://localhost:4001/movies/`
const tvBaseURL = `http://localhost:4002/series/`

const resolvers = {
  Query: {
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
    },
    series: async () => {
      try {
        const tvData = await redis.get('series:data')
        if (tvData) {
          return JSON.parse(tvData)
        } else {
          const { data } = await axios({
            method: 'get',
            url: tvBaseURL
          })
          await redis.set('series:data', JSON.stringify(data))
          return data
        }
      } catch (err) {
        console.log(err)
      }
    },
    seriesDetail: async (_, args) => {
      try {
        const tvData = await redis.get('seriesDetail:data')
        if (tvData) {
          return JSON.parse(tvData)
        } else {
          const { id } = args
          const { data } = await axios({
            method: 'get',
            url: tvBaseURL + id
          })
          await redis.set('seriesDetail:data', JSON.stringify(data))
          return data
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  Mutation: {
    createMovie: async (_, args) => {
      try {
        console.log('masukk try')
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
    createSeries: async (_, args) => {
      try {
        await redis.del('series:data')
        await redis.del('seriesDetail:data')
        const { title, overview, poster_path, popularity, tags } = args
        const tvData = { title, overview, poster_path, popularity, tags }
        const { data } = await axios({
          method: 'post',
          url: tvBaseURL,
          data: tvData
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
    editSeries: async (_, args) => {
      try {
        await redis.del('series:data')
        await redis.del('seriesDetail:data')
        const { id, title, overview, poster_path, popularity ,tags } = args
        const seriesData = { title, overview, poster_path, popularity, tags}
        const { data } = await axios({
          method: 'put',
          url: tvBaseURL + id,
          data: seriesData
        })
        return data
      } catch(err) {
        console.log(err)
      }
    },
    deleteMovie: async(_, args) => {
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
    },
    deleteSeries: async (_, args) => {
      try {
        await redis.del('series:data')
        await redis.del('seriesDetail:data')
        const { id } = args
        const {data} = await axios({
          method: 'delete',
          url: tvBaseURL + id
        })
        return data
      } catch (err) {
        console.log(err)
      }
    }
  }
}

module.exports = resolvers