const Redis = require("ioredis")
const redis = new Redis()
const axios = require("axios")

const tvBaseURL = `http://localhost:4002/series/`

const resolvers = {
  Query : {
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
  Mutation : {
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
        throw err
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