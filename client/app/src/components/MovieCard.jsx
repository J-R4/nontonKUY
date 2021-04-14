import React from 'react'

const MovieCard = (props) => {

  const { movie } = props
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-image">
          <img className="image" src={movie.poster_path} alt="" />
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <img className="image is-48x48" src={movie.poster_path} alt="" srcset="" />
            </div>
            <div className="media-content">
              <p className="title is-4">
                {movie.title}
              </p>
            </div>
          </div>
          <div className="content">
            <b>Overview:</b>
            <p className="subtitle is-6">
              {movie.overview}
            </p>
            <p className="subtitle is-7">
              {movie.popularity} / 5
            </p>
            <p className="subtitle is-7">
              tags : {movie.tags}
            </p>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fas fa-trash" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fas fa-edit" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>

  )
}

export default MovieCard