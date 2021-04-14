import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';
import {
  useHistory,
  Link,
  useParams
} from "react-router-dom";

const EditMovie = () => {
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [poster, setPoster] = useState('')
  const [popularity, setPopularity] = useState(0)
  const [tags, setTags] = useState('')
  const history = useHistory();
  const { id } = useParams()

  const EDIT_MOVIE = gql`
    mutation editMovie($id: ID, $title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String]! ) {
    editMovie
    (
      id: $id
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    )
    {
      message
    }
  }
  `

  const GET_MOVIE = gql`
    query Movie($id: ID) {
      movie(id: $id) {
        _id
        title
        overview
        poster_path
        popularity
        tags
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
  const [editMovie] = useMutation(EDIT_MOVIE, {
    refetchQueries: [{ query: GET_ALL_DATA }]
  });

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: {
      id
    }
  });

  useEffect(() => {
    if (data) {
      setTitle(data.movie.title)
      setOverview(data.movie.overview)
      setPoster(data.movie.poster_path)
      setPopularity(data.movie.popularity)
      setTags(data.movie.tags)
    }
  }, [data])

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const SubmitMovie = (event) => {
    event.preventDefault()
    console.log(id, title, overview, poster, popularity, tags, 'M<<<<<<<<<<<')
    editMovie({
      variables: {
        id: id,
        title: title,
        overview: overview,
        poster_path: poster,
        popularity: parseFloat(popularity),
        tags: tags
      }
    }
    )

    setTitle('')
    setOverview('')
    setPoster('')
    setPopularity(0)
    setTags('')
    history.push('/')
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
    setTags(event.target.value.split(','))
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
              Edit Movie
            </p>
          </div>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control has-icons-left">
              <input value={title} className="input" type="text" placeholder="Soul" onChange={ChangeTitle} />
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
              <input value={overview} className="input" type="text" placeholder="Soul is a disney movie" onChange={ChangeOverview} />
              <span className="icon is-small is-left">
                <i className="fas fa-book"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">
              Poster
            </label>
            <div className="control has-icons-left">
              <input value={poster} className="input" type="text" placeholder="unsplash.com/1237812" onChange={ChangePoster} />
              <span className="icon is-small is-left">
                <i className="fas fa-link"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">
              Popularity
            </label>
            <div className="control has-icons-left">
              <input value={popularity} className="input" type="text" placeholder="5" onChange={ChangePopularity} />
              <span className="icon is-small is-left">
                <i className="fas fa-star"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">
              Tags
            </label>
            <div className="control has-icons-left">
              <input value={tags} className="input" type="text" placeholder="Adventure" onChange={ChangeTags} />
              <span className="icon is-small is-left">
                <i className="fas fa-list"></i>
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="button is-black"
          >Edit Movie</button>
          <Link to="/">
            <button
              id="link-register-reg"
              className="button is-white"
              style={{ borderColor: "grey" }}
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