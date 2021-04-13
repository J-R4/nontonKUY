import { gql, useQuery } from '@apollo/client';
import { MovieCard } from '../components/index.js'

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
    <div className="container is-black">
      <div>
        {
          data.movies.map(el => {
            <MovieCard movie={el} key={el._id}></MovieCard>
          })
        }
      </div>
      <div className="box is-black">
        <div className="columns is-centered" style={{ marginTop: "20px" }}>
          <img className="" src="https://silverandgold.s3-ap-southeast-1.amazonaws.com/NONTONKUY.png" alt="NK Logo" width="200px" height="500px" />
        </div>
        <div className="columns">
          <div className="column">
            <div className="">
              <button className="">
                Movies
              </button>
              <div>
                <img className="" src="https://pbs.twimg.com/media/ED6DfG5U8AUk6j5.jpg" alt="movies" width="200px" height="500px" />
              </div>
            </div>
          </div>
          <div className="">
            <button className="">
              Series
            </button>
            <div>
              <img className="" src="https://bostonglobe-prod.cdn.arcpublishing.com/resizer/ze-3rhOFVa3jLGT76Fy6JUPNsGw=/1280x0/arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/G4SDN65E6JBI5CX2XXLVIIJIEI.jpeg" alt="series" width="200px" height="500px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home