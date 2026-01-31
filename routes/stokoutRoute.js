const express = require('express')
const stokoutControl = require('../controllers/stokoutController')

const router = express.Router()

router.get('/',stokoutControl.getAllStokout)
router.post('/',stokoutControl.addStokout)

module.exports = router