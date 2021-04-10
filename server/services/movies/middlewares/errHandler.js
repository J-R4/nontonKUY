const errHandler = (err, req, res, next) => {
  if (err) {
    res.status(err.status).json({ message: err.message })
  } else {
    res.status(500).json({message: `internal server error`})
  }
}

module.exports = errHandler