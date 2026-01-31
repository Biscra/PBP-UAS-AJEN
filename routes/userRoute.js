const express = require('express')
const router = express.Router()
const userControl = require('../controllers/userController')

router.get('/', userControl.getAllUser)
router.get('/:id', userControl.getUserById)

module.exports = router
