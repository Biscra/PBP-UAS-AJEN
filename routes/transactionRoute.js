const express = require('express')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')
const transactionControl = require('../controllers/transactionController')

router.post('/', userAuth, transactionControl.addTransaction)

module.exports = router