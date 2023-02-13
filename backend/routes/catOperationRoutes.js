const express = require('express')
const router = express.Router()
const {getMedicalFileOperations, createMedicalFileOperation, deleteOperarions, deleteOperarionsByMedicalFile, updateOperation} = require('../controllers/catOperationController')

const {protect} = require('../middleware/authMiddleware')
const {multer, sendUploadToGCS} = require('../middleware/uploadMiddleware')

router.route('/').post(protect, createMedicalFileOperation).delete(protect, deleteOperarions)
router.route('/:medicalFileId').get(protect, getMedicalFileOperations)
router.route('/:operationId').put(protect, updateOperation)
router.route('/by-medicalfile').delete(protect, deleteOperarionsByMedicalFile)


// Process the file upload and upload to Google Cloud Storage.
router.post('/uploadFile', multer.array('file', 1), sendUploadToGCS, (req, res, next) => {
    res.status(200).json({ file: req.files.map(file => file.cloudStoragePublicUrl) });
})

module.exports = router