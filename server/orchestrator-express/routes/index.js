const router = require('express').Router()

const AppController = require('../controllers/AppController.js')
const MvController = require('../controllers/MvController.js')
const TvController = require('../controllers/TvController.js')

router.get('/', AppController.read)

router.get('/movies', MvController.readM)
router.post('/movies',  MvController.createM)
// router.put('/movies/:id', MvController.updateM)
// router.delete('/movies/:id',  MvController.deleteM)

// router.get('/series', TvController.readS)
// router.post('/series',  TvController.createS)
// router.put('/series/:id', TvController.updateS)
// router.delete('/series/:id',  TvController.deleteS)

module.exports = router