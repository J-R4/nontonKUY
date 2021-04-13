import React from 'react'

const MovieCard = (props) => {

  const { movie } = props
  console.log(movie)
  return (
    <div className="box">
      {movie.title}
      {movie.overview}
      <img src={movie.poster_path} alt="" srcset="" />g
      {movie.popularity}
      {movie.tags}
    </div>
  )
}

export default MovieCard