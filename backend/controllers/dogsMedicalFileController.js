const asyncHandler = require('express-async-handler')

const DogMedicalFile = require('../models/dogMedicalFileModel')

// @desc Get dog's medical files
// @route GET /api/medicalFiles-dogs
// @access Private
const getDogMedicalFiles = asyncHandler(async (req, res) => {
    const dogMedicalFiles = await DogMedicalFile.find({})
    res.status(200).json({dogMedicalFiles})
})

// @desc Create new dog's medical file
// @route POST /api/medicalFiles-dogs
// @access Private
const createDogMedicalFile = asyncHandler(async(req, res) => {
    if(!req.body.arrivalDate) {
        res.status(400)
        throw new Error('נא למלא תאריך הגעה')
    }

    const dogMedicalFile = await DogMedicalFile.create(req.body)
    

    if(dogMedicalFile) {
        const medicalFileObj = dogMedicalFile.toObject()
        res.status(201).json({
            _id: dogMedicalFile.id,
            ...medicalFileObj

        })
    } else {
        res.status(401)
        throw new Error('Invalid medical file details')
    }
})

// @desc Delete dog's medical file
// @route DELETE /api/medicalFiles-dogs
// @access Private
const deleteDogMedicalFile = asyncHandler(async (req, res) => {
    const {body} = req.body
    await DogMedicalFile.deleteMany({ _id: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Get dog's medical file
// @route GET /api/medicalFiles-dogs/:medicalFileId
// @access Private
const getDogMedicalFile = asyncHandler(async (req, res) => {
    const dogMedicalFile = await DogMedicalFile.findById(req.params.medicalFileId)

    if(!medicalFile) {
        res.status(404)
        throw new Error('Medical file not found')
    }
    res.status(200).json(dogMedicalFile)
})

// @desc Update dog's medical file
// @route PUT /api/medicalFiles-dogs/:medicalFileId
// @access Private
const updateDogMedicalFile = asyncHandler(async (req, res) => {
    const dogMedicalFile = await DogMedicalFile.findById(req.params.medicalFileId)

    if(!dogMedicalFile) {
        res.status(404)
        throw new Error('Medical file not found')
    }
    if(dogMedicalFile.__v !== req.body.__v) {
        throw new Error('התיק הרפואי נערך על ידי משתמש אחר, יש לרענן כדי לראות את השינוים')
    } 

    if(req.body.images.length > 3) {
        res.status(400)
        throw new Error('ניתן להעלות מקסימום 3 תמונות')
    }
    delete req.body['__v']
    const updatedMedicalFile = await DogMedicalFile.findByIdAndUpdate(req.params.medicalFileId, {...req.body, $inc: { __v: 1 }}, {new: true})
    res.status(200).json(updatedMedicalFile)
})

module.exports = {
    getDogMedicalFiles,
    createDogMedicalFile,
    deleteDogMedicalFile,
    getDogMedicalFile,
    updateDogMedicalFile
}