const { ApolloServer, gql } = require("apollo-server")
const Redis = require("ioredis")
const redis = new Redis()
const axios = require("axios")

const mvBaseURL = `http://localhost:4001/movies/`
const tvBaseURL = `http://localhost:4002/series/`

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
    series: [Series]
    seriesDetail(id:ID): Series
  }

  type Mutation{
    createMovie(title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Movie
    createSeries(title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Series
    editMovie(id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Movie
    editSeries(id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Series
    deleteMovie(id: ID): Movie
    deleteSeries(id: ID): Series
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const mvData = await redis.get('movies:data')
        if (mvData) {
          return mvData
        } else {
          const { data } = await axios({
            method: 'get',
            url: mvBaseURL
          })
          await redis.set('movies:data', data)
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
          return mvData
        } else {
          const { id } = args
          const { data } = await axios({
            method: 'get',
            url: mvBaseURL + id
          })
          await redis.set('movie:data', data)
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
          return tvData
        } else {
          const { data } = await axios({
            method: 'get',
            url: tvBaseURL
          })
          await redis.set('series:data', data)
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
          return tvData
        } else {
          const { id } = args
          const { data } = await axios({
            method: 'get',
            url: tvBaseURL + id
          })
          await redis.set('seriesDetail:data', data)
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
        await redis.del('movies:data')
        await redis.del('movie:data')
        let mvTags = ''
        for (let i = 0; i < args.tags.length; i++) {
          mvTags += args.tags[i];
        }
        const { title, overview, poster_path, popularity } = args
        const mvData = { title, overview, poster_path, popularity, tags: mvTags }
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
        let sTags = ''
        for (let i = 0; i < args.tags.length; i++) {
          sTags += args.tags[i];
        }
        const { title, overview, poster_path, popularity } = args
        const tvData = { title, overview, poster_path, popularity, tags: sTags }
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
        let mvTags = ''
        for (let i = 0; i < args.tags.length; i++) {
          mvTags += args.tags[i];
        }
        const { id, title, overview, poster_path, popularity } = args
        const mvData = { title, overview, poster_path, popularity, tags: mvTags }
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
        let seriesTags = ''
        for (let i = 0; i < args.tags.length; i ++) {
          seriesTags += args.tags[i]
        }
        const { id, title, overview, poster_path, popularity } = args
        const seriesData = { title, overview, poster_path, popularity, tags: seriesTags}
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
    deleteMovie: async(_, args) => {
      try {
        await redis.del('movies:data')
        await redis.del('movie:data')
        const { id } = args
        const data = await axios({
          method: 'delete',
          url: mvBaseURL + id
        })
        return data
      } catch (err) {
        throw err
      }
    },
    deleteSeries: async(_, args) => {
      await redis.del('series:data')
      await redis.del('seriesDetail:data')
      const { id } = args
      const data = await axios({
        method: 'delete',
        url: tvBaseURL + id
      })
      return data
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
