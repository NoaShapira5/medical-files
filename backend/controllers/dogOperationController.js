const asyncHandler = require('express-async-handler')

const DogMedicalFile = require('../models/dogMedicalFileModel')
const DogOperation = require('../models/dogOperationModel')
const DogTreatment = require('../models/dogTreatmentModel')
const Examination = require('../models/examinationModel')

// @desc Get dog's medical file's operations
// @route GET /api/dogOperations/:medicalFileId
// @access Private
const getDogMedicalFileOperations = asyncHandler(async (req, res) => {
    const {medicalFileId} = req.params

    const dogOperations = await DogOperation.find({medicalFile: medicalFileId})

    res.status(200).json({dogOperations})
})

// @desc Create new operation
// @route POST /api/dogOperations
// @access Private
const createDogMedicalFileOperation = asyncHandler(async (req, res) => {
    const {dateTime, type, content, comments, file, fileId, userName, active, print} = req.body
    if(!type || !content) {
        res.status(400)
        throw new Error('נא למלא את סוג ותוכן המהלך הרפואי')
    }

    // Get medicalFile using id
    const medicalFile = await DogMedicalFile.findById(fileId)
    let operation
    if(type === 'הנחיות') {
        operation = await DogOperation.create({
            dateTime,
            type,
            content,
            active,
            print,
            file,
            userName,
            user: req.user.id,
            medicalFile: medicalFile.id
        })
    } else if(type === 'הערות') {
        operation = await DogOperation.create({
            dateTime,
            type,
            content,
            print,
            file,
            userName,
            user: req.user.id,
            medicalFile: medicalFile.id
        })
        
    } else if(type === 'תרופה') {
        operation = await DogOperation.create({
            dateTime,
            type,
            content,
            comments,
            print,
            file,
            userName,
            user: req.user.id,
            medicalFile: medicalFile.id,
        })

    } else {
        let result
        if(type === 'טיפול') {
            result = await DogTreatment.findOne({treatmentName: content})
        } else if(type === 'בדיקה') {
            result = await Examination.findOne({examinationName: content})
        }
        if(!result) {
            res.status(401)
            throw new Error('Not found')
        }
        operation = await DogOperation.create({
            dateTime,
            type,
            content,
            comments,
            print,
            file,
            userName,
            user: req.user.id,
            medicalFile: medicalFile.id,
        })

    }
    res.status(201).json(operation)
})

// @desc Delete operation
// @route DELETE /api/dogOperations
// @access Private
const deleteDogOperarions = asyncHandler(async (req, res) => {
    const {body} = req.body
    await DogOperation.deleteMany({ _id: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Delete operations by medical file
// @route DELETE /api/dogOperations/by-medicalfile
// @access Private
const deleteDogOperarionsByMedicalFile = asyncHandler(async (req, res) => {
    const {body} = req.body
    await DogOperation.deleteMany({ medicalFile: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Edit operation
// @route PUT /api/dogOperations/:operationId
// @access Private
const updateDogOperation = asyncHandler(async(req, res) => {
    const operation = await DogOperation.findById(req.params.operationId)

    if(!operation) {
        res.status(404)
        throw new Error('Dog operation not found')
    }

    const {dateTime, type, content, comments, file, userName, active, print, medicalFile} = req.body

    let updatedOperation
    if(type === 'הנחיות') {
        updatedOperation = {
            dateTime,
            type,
            content,
            active,
            print,
            file,
            userName,
            user: req.user.id,
            medicalFile: medicalFile.id,

        }
    } else if(type === 'הערות') {
        updatedOperation = {
            dateTime,
            type,
            content,
            print,
            file,
            userName,
            user: req.user.id,
            medicalFile: medicalFile.id,
        }
        
    } else if(type === 'תרופה') {
        updatedOperation = {
            dateTime,
            type,
            content,
            comments,
            print,
            file,
            userName,
            user: req.user.id,
            medicalFile: medicalFile.id,
        }

    } else {
        let result
        if(type === 'טיפול') {
            result = await DogTreatment.findOne({treatmentName: content})
        } else if(type === 'בדיקה') {
            result = await Examination.findOne({examinationName: content})
        }
        if(!result) {
            res.status(401)
            throw new Error('Not found')
        }
        updatedOperation = {
            dateTime,
            type,
            content,
            comments,
            print,
            file,
            userName,
            user: req.user.id,
            medicalFile: medicalFile.id,
        }
    }
    const updated = await DogOperation.findByIdAndUpdate(req.params.operationId, updatedOperation, {new: true})
    res.status(201).json(updated)
})


module.exports = {
    getDogMedicalFileOperations,
    createDogMedicalFileOperation,
    deleteDogOperarions,
    deleteDogOperarionsByMedicalFile,
    updateDogOperation
}

