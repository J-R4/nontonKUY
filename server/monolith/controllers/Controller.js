class Controller {
  static hello = async (req, res, next) => {
    try {
      res.status(200).json({message: 'hello good people !'})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller