const express = require('express')
const { importOpenFda } = require('../controllers/openFdaController')
const router = express.Router()

router.post('/import', importOpenFda)

module.exports = router