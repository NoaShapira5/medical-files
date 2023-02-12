const express = require('express')
const router = express.Router()
const {getDogMedicalFiles, createDogMedicalFile, deleteDogMedicalFile, getDogMedicalFile, updateDogMedicalFile} = require('../controllers/dogsMedicalFileController')

const {protect} = require('../middleware/authMiddleware')
const {multer, sendUploadToGCS, deleteFile} = require('../middleware/uploadMiddleware')

router.route('/').get(protect, getDogMedicalFiles).post(protect, createDogMedicalFile).delete(protect, deleteDogMedicalFile)
router.route('/:medicalFileId').get(protect, getDogMedicalFile).put(protect, updateDogMedicalFile)

// Process the file upload and upload to Google Cloud Storage.
router.post('/upload', multer.array('images', 3), sendUploadToGCS, (req, res, next) => {
    res.status(200).json({ files: req.files.map(file => file.cloudStoragePublicUrl) });
})

router.route('/delete-file').delete(deleteFile, protect)

module.exports = router