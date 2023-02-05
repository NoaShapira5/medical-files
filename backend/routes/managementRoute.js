const express = require('express')
const router = express.Router()
const {getCommunity, createCommunity, deleteCommunities, updateCommunity,
     getDiagnosis, createDiagnosis, deleteDiagnoses, updateDiagnosis,
     getMedicines, createMedicine, deleteMedicines, updateMedicine,
     getTreatments, createTreatment, deleteTreatments, updateTreatment,
     getExaminations, createExamination, deleteExaminations, updateExamination}
     = require('../controllers/managementController')

const {protect} = require('../middleware/authMiddleware')

router.route('/medicines').get(protect, getMedicines).post(protect, createMedicine).delete(protect, deleteMedicines)
router.route('/medicines/:medicineId').put(protect, updateMedicine)
router.route('/treatments').get(protect, getTreatments).post(protect, createTreatment).delete(protect, deleteTreatments)
router.route('/treatments/:treatmentId').put(protect, updateTreatment)
router.route('/examinations').get(protect, getExaminations).post(protect, createExamination).delete(protect, deleteExaminations)
router.route('/examinations/:examinationId').put(protect, updateExamination)
router.route('/diagnosis').get(protect, getDiagnosis).post(protect, createDiagnosis).delete(protect, deleteDiagnoses)
router.route('/diagnosis/:diagnosisId').put(protect, updateDiagnosis)
router.route('/community').get(protect, getCommunity).post(protect, createCommunity).delete(protect, deleteCommunities)
router.route('/community/:communityId').put(protect, updateCommunity)


module.exports = router