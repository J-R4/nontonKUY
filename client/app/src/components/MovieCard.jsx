import React from 'react'
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom'
import { addFavorite } from '../config/var.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieCard = (props) => {
  const notifyDelete = () => toast("Delete Successfully!");
  const notifyFav = () => toast("Added to Favorite Successfully!");

  const history = useHistory()

  const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID) {
    deleteMovie
      (id: $id)
    {
      message
    }
  }
  `

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
  const [deleteMv] = useMutation(DELETE_MOVIE, {
    refetchQueries: [
      { query: GET_ALL_DATA }
    ]
  });


  const deleteMovie = () => {
    deleteMv(
      {
        variables: { id: props.movie._id }
      }
    )
    notifyDelete()
  }

  const editMovie = () => {
    history.push(`/editMovie/${props.movie._id}`)
  }

  const addFav = () => {
    const theFav = addFavorite()
    const tempFav = [...theFav, props.movie]
    const filtering = theFav.filter(fav => fav._id === props.movie._id)

    if (!filtering[0]) {
      addFavorite(tempFav)
      notifyFav()
    } else {
      toast.error('🦄 You already add this!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const { movie } = props
  return (
    <div className="column is-one-third">
      <ToastContainer />
      <nav className="level is-mobile">
        <div className="level-left">
          <a className="level-item" onClick={deleteMovie}>
            <span className="icon is-small">
              <i className="fas fa-googles" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
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
              {movie.popularity} / 5 <i className="fas fa-star" aria-hidden="true"></i>
            </p>
            <p className="subtitle is-7">
              tags : {
                movie.tags.map((el, i) => {
                  if (i === movie.tags.length - 1) {
                    return `${el}`
                  } else {
                    return `${el}, `
                  }
                })
              }
            </p>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item" onClick={deleteMovie}>
                <span className="icon is-small">
                  <i className="fas fa-trash" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" onClick={editMovie}>
                <span className="icon is-small">
                  <i className="fas fa-edit" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" onClick={addFav}>
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