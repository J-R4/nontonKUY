const router = require('express').Router()

const AppController = require('../controllers/AppController.js')
const MvController = require('../controllers/MvController.js')
const TvController = require('../controllers/TvController.js')

router.get('/', AppController.read)

module.exports = router