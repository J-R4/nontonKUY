const router = require('express').Router()

const MovieController = require('../controllers/MovieController.js')

router.get('/', MovieController.readM)
router.post('/',MovieController.createM)
router.get('/:id',MovieController.readOneM)
router.put('/:id',MovieController.updateM)
router.delete('/:id',MovieController.deleteM)

module.exports = router