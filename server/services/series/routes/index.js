const router = require('express').Router()

const SeriesController = require('../controllers/SeriesController.js')

router.get('/', SeriesController.readS)
router.post('/',SeriesController.createS)
router.get('/:id',SeriesController.readOneS)
router.put('/:id',SeriesController.updateS)
router.delete('/:id',SeriesController.deleteS)

module.exports = router