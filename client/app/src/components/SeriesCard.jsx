import React from 'react'

const SeriesCard = (props) => {

  const { series } = props
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-image">
          <img className="image" src={series.poster_path} alt="" />
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <img className="image is-48x48" src={series.poster_path} alt="" srcset="" />
            </div>
            <div className="media-content">
              <p className="title is-4">
                {series.title}
              </p>
            </div>
          </div>
          <div className="content">
            <b>Overview:</b>
            <p className="subtitle is-6">
              {series.overview}
            </p>
            <p className="subtitle is-7">
              {series.popularity} / 5 <i className="fas fa-star" aria-hidden="true"></i>
            </p>
            <p className="subtitle is-7">
              tags : {
                series.tags.map((el, i) => {
                  if (i === series.tags.length - 1) {
                    return `${el}`
                  } else {
                    return `${el}, `
                  }
                })
              }
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SeriesCard