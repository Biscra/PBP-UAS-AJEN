const express = require('express')
const categoryControl = require('../controllers/categoryController')

const router = express.Router()

router.get('/',categoryControl.getAllCategory)
router.get('/:code',categoryControl.getCategoryByCode)

router.post('/',categoryControl.addCategory)
router.delete('/:code',categoryControl.delCategory)
router.put('/:code',categoryControl.updateCategory)

module.exports = router