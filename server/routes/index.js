const router = require('express').Router()

const Controller = require('../controllers/Controller.js')

router.get('/', Controller.hello)

module.exports = router