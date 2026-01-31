const express = require('express')
const medicineControl = require('../controllers/medicineController')

const router = express.Router()

router.get('/',medicineControl.getAllMedicine)
router.get('/:code',medicineControl.getMedicineByCode)

router.get('/openfda', medicineControl.getMedicineFromOpenFda)
router.get('/merge', medicineControl.getMergeMedicine)

router.post('/',medicineControl.addMedicine)
router.delete('/:code',medicineControl.delMedicine)
router.put('/:code',medicineControl.updateMedicine)

module.exports = router