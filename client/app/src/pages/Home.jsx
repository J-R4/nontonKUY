import { gql, useQuery } from '@apollo/client';
import { MovieCard, SeriesCard } from '../components/index.js'

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

  const showMovies = () => {

  }
  return (
    <div className="container is-max-desktop">
      <div className="box">
        <div className="columns is-centered" style={{ marginTop: "20px" }}>
          <img className="" src="https://silverandgold.s3-ap-southeast-1.amazonaws.com/NONTONKUY.png" alt="NK Logo" width="200px" height="500px" />
        </div>
        <div className="columns is-centered">
          <div className="column" style={{ marginLeft: "150px" }}>
            <p className="title is-4">
              Movies
            </p>
            <div>
              <img className="" style={{ hover: "red" }} src="https://pbs.twimg.com/media/ED6DfG5U8AUk6j5.jpg" alt="movies" width="200px" height="500px" />
            </div>
          </div>
          <div className="column" style={{ marginLeft: "50px" }}>
            <p className="title is-4">
              Series
            </p>
            <div>
              <img className="" src="https://bostonglobe-prod.cdn.arcpublishing.com/resizer/ze-3rhOFVa3jLGT76Fy6JUPNsGw=/1280x0/arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/G4SDN65E6JBI5CX2XXLVIIJIEI.jpeg" alt="series" width="200px" height="500px" />
            </div>
          </div>
        </div>
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