const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
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
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
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
// @route DELETE /api/medicalFiles/:medicalFileId
// @access Private
const deleteMedicalFile = asyncHandler(async (req, res) => {
    const {body} = req.body


    await MedicalFile.deleteMany({ _id: {
        $in: body
    }})

    res.status(200).json(body)
})

module.exports = {
    getMedicalFiles,
    createMedicalFile,
    deleteMedicalFile
}