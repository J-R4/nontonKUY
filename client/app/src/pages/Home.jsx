import { gql, useQuery } from '@apollo/client';
import { MovieCard, SeriesCard } from '../components/index.js'
import { Link } from 'react-router-dom'

const Home = () => {

  const GET_ALL_DATA = gql`
  query getAllData{
  movies{
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
  series{
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

  const { loading, error, data } = useQuery(GET_ALL_DATA);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container is-max-desktop">
      <div className="box">
        <div className="columns is-centered" style={{ marginTop: "20px" }}>
          <img className="" src="https://silverandgold.s3-ap-southeast-1.amazonaws.com/NONTONKUY.png" alt="NK Logo" width="200px" height="500px" />
        </div>
        <nav className="level is-mobile">
          <div>
            <Link to="/addMovie">
              <a className="level-item" aria-label="reply">
                <span className="icon is-small">
                  <i className="fas fa-eye" aria-hidden="true"></i>
                </span>
                Add Movie
                </a>
            </Link>
          </div>
          <div>
            <Link to="/favorites">
              <a className="level-item" aria-label="retweet">
                <span className="icon is-small">
                  <i className="fas fa-heart" aria-hidden="true"></i>
                </span>
                  Favourites
                </a>
            </Link>
          </div>
        </nav>
        <h1 className="title is-3">Movies</h1>
        <div class="column is-main-content">
          <div class="container is-widescreen">
            <div className="columns is-centered is-multiline" style={{ padding: "20px" }}>
              {
                data.movies.map(el => {
                  return <MovieCard movie={el} key={el._id}></MovieCard>
                })
              }
            </div>
          </div>
        </div>
        <h1 className="title is-3">Series</h1>
        <div className="columns is-centered" style={{ padding: "20px" }}>
          {
            data.series.map(el => {
              return <SeriesCard series={el} key={el._id}></SeriesCard>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home