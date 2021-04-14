import React from 'react'
import { useReactiveVar } from '@apollo/client';
import { Link } from 'react-router-dom'
import { MovieCard } from '../components/index.js'
import { addFavorite } from '../config/var.js'

const Favorites = () => {
  const getFav = useReactiveVar(addFavorite)
  console.log(getFav)
  return (
    <>
      <div className="container is-max-desktop">
        <div className="box">
          <h1 className="title is-3 columns is-centered">Favorites</h1>
          <Link to="/">
            <a className="level-item" aria-label="reply">
              <span className="icon is-small">
                <i className="fas fa-key" aria-hidden="true"></i>
              </span>
                Home
                </a>
          </Link>
          <div class="column is-main-content">
            <div class="container is-widescreen">
              <div className="columns is-centered is-multiline" style={{ padding: "20px" }}>
                {
                  getFav.length ? getFav.map(el => {
                    return <MovieCard movie={el} key={el._id}></MovieCard>
                  }) : <h1>You doesnt have any favorite, add it first at Home :) </h1>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Favorites