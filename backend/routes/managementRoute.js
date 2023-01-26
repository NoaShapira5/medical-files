const express = require('express')
const router = express.Router()
const {getMedicines, createMedicine, getTreatments, createTreatment, getExaminations, createExamination} = require('../controllers/managementController')

const {protect} = require('../middleware/authMiddleware')

router.route('/medicines').get(protect, getMedicines).post(protect, createMedicine)
router.route('/treatments').get(protect, getTreatments).post(protect, createTreatment)
router.route('/examinations').get(protect, getExaminations).post(protect, createExamination)

module.exports = router