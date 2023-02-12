const express = require('express')
const router = express.Router()
const {getDogMedicalFileOperations, createDogMedicalFileOperation, deleteDogOperarions, deleteDogOperarionsByMedicalFile, updateDogOperation} = require('../controllers/dogOperationController')

const {protect} = require('../middleware/authMiddleware')
const {multer, sendUploadToGCS} = require('../middleware/uploadMiddleware')

router.route('/').post(protect, createDogMedicalFileOperation).delete(protect, deleteDogOperarions)
router.route('/:medicalFileId').get(protect, getDogMedicalFileOperations)
router.route('/:operationId').put(protect, updateDogOperation)
router.route('/by-medicalfile').delete(protect, deleteDogOperarionsByMedicalFile)


// Process the file upload and upload to Google Cloud Storage.
router.post('/uploadFile', multer.array('file', 1), sendUploadToGCS, (req, res, next) => {
    res.status(200).json({ file: req.files.map(file => file.cloudStoragePublicUrl) });
})

module.exports = router