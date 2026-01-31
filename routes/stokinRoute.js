const express = require('express')
const stokinControl = require('../controllers/stokinController')

const router = express.Router()

router.get('/',stokinControl.getAllStokin)
router.post('/',stokinControl.addStokin)

module.exports = router
