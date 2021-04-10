const router = require('express').Router()

const SeriesController = require('../controllers/SeriesController.js')

router.get('/',SeriesController.readS)
router.post('/',SeriesController.createS)
router.put('/',SeriesController.updateS)
router.delete('/',SeriesController.deleteS)

module.exports = router