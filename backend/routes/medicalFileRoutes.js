const express = require('express')
const router = express.Router()
const {getMedicalFiles, createMedicalFile, deleteMedicalFile, getMedicalFile, updateMedicalFile} = require('../controllers/medicalFileController')

const {protect} = require('../middleware/authMiddleware')
const {multer, sendUploadToGCS} = require('../middleware/uploadMiddleware')

router.route('/').get(protect, getMedicalFiles).post(protect, createMedicalFile).delete(protect, deleteMedicalFile)
router.route('/:medicalFileId').get(protect, getMedicalFile).put(protect, updateMedicalFile)

// Process the file upload and upload to Google Cloud Storage.
router.post('/upload', multer.array('images', 3), sendUploadToGCS, (req, res, next) => {
    res.status(200).json({ files: req.files.map(file => file.cloudStoragePublicUrl) });
})

module.exports = router