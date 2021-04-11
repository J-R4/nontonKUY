const { ApolloServer, gql } = require("apollo-server")
const resolvers = require('./resolver.js')

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Message{
    message: String
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

    editMovie(id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Message
    editSeries(id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Message

    deleteMovie(id: ID): Message
    deleteSeries(id: ID): Message
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
