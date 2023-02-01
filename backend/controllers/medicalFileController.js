const asyncHandler = require('express-async-handler')

const MedicalFile = require('../models/medicalFileModel')

// @desc Get medical files
// @route GET /api/medicalFiles
// @access Private
const getMedicalFiles = asyncHandler(async (req, res) => {
    const medicalFiles = await MedicalFile.find({})
    res.status(200).json({medicalFiles})
})

// @desc Create new medical file
// @route POST /api/medicalFiles
// @access Private
const createMedicalFile = asyncHandler(async(req, res) => {
    if(!req.body.arrivalDate || !req.body.cageNum || !req.body.refNum) {
        res.status(400)
        throw new Error('נא למלא את שדות החובה: תאריך הגעה, מספר הכלוב ומספר הפנייה')
    }

    const medicalFile = await MedicalFile.create(req.body)
    

    if(medicalFile) {
        const medicalFileObj = medicalFile.toObject()
        res.status(201).json({
            _id: medicalFile.id,
            ...medicalFileObj

        })
    } else {
        res.status(401)
        throw new Error('Invalid medical file details')
    }
})

// @desc Delete medical file
// @route DELETE /api/medicalFiles
// @access Private
const deleteMedicalFile = asyncHandler(async (req, res) => {
    const {body} = req.body
    await MedicalFile.deleteMany({ _id: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Get medical file
// @route GET /api/meidcalFiles/:medicalFileId
// @access Private
const getMedicalFile = asyncHandler(async (req, res) => {
    const medicalFile = await MedicalFile.findById(req.params.medicalFileId)

    if(!medicalFile) {
        res.status(404)
        throw new Error('Medical file not found')
    }
    res.status(200).json(medicalFile)
})

// @desc Update medical file
// @route PUT /api/medicalFiles/:medicalFileId
// @access Private
const updateMedicalFile = asyncHandler(async (req, res) => {
    const medicalFile = await MedicalFile.findById(req.params.medicalFileId)

    if(!medicalFile) {
        res.status(404)
        throw new Error('Medical file not found')
    }

    if(req.body.images.length > 3) {
        res.status(400)
        throw new Error('ניתן להעלות מקסימום 3 תמונות')
    }

    const updatedMedicalFile = await MedicalFile.findByIdAndUpdate(req.params.medicalFileId, req.body, {new: true})

    res.status(200).json(updatedMedicalFile)
})

module.exports = {
    getMedicalFiles,
    createMedicalFile,
    deleteMedicalFile,
    getMedicalFile,
    updateMedicalFile
}