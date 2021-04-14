import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'

const EditMovie = () => {
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [poster, setPoster] = useState('')
  const [popularity, setPopularity] = useState('')
  const [tags, setTags] = useState('')

  const SubmitMovie = (event) => {
    event.preventDefault()

    const EDIT_MOVIE = gql`
    mutation editMovie{
      editMovie
      (
        title: ${title}
        overview: ${overview}
        poster_path: ${poster}
        popularity: ${popularity}
        tags: [${tags}]
      )
      {
        message
      }
    }
  `
    useQuery(EDIT_MOVIE);

    setTitle('')
    setOverview('')
    setPoster('')
    setPopularity('')
    setTags('')
  }

  const ChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const ChangeOverview = (event) => {
    setOverview(event.target.value)
  }

  const ChangePoster = (event) => {
    setPoster(event.target.value)
  }

  const ChangePopularity = (event) => {
    setPopularity(event.target.value)
  }

  const ChangeTags = (event) => {
    setTags(event.target.value)
  }

  return (
    <>
      <div className="column" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: "10px"
      }}>
        <form
          onSubmit={(e) => SubmitMovie(e)}
          className="box" style={{
            backgroundColor: "white",
            boxShadow: "0px 0px 20px rgb(211,211,211)"
          }}>
          <div>
            <p style={{ margin: "0px 0px 10px 0px" }}>
              Add Movie
            </p>
          </div>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Soul" onChange={ChangeTitle} />
              <span className="icon is-small is-left">
                <i className="fas fa-prescription-bottle"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">
              Overview
            </label>
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Soul is a disney movie" onChange={ChangeOverview} />
              <span className="icon is-small is-left">
                <i className="fas fa-link"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">
              Poster
            </label>
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="unsplash.com/1237812" onChange={ChangePoster} />
              <span className="icon is-small is-left">
                <i className="fas fa-image"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">
              Popularity
            </label>
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="5" onChange={ChangePopularity} />
              <span className="icon is-small is-left">
                <i className="fas fa-number"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">
              Tags
            </label>
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Adventure" onChange={ChangeTags} />
              <span className="icon is-small is-left">
                <i className="fas fa-list"></i>
              </span>
            </div>
          </div>
          <Link to="/">
            <button
              type="submit"
              className="button is-black"
            >Add Movie</button>
          </Link>
          <Link to="/">
            <button
              id="link-register-reg"
              className="button is-white"
              style="border-color:grey;"
            >
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </>
  )
}

export default EditMovie