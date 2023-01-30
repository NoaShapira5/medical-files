const asyncHandler = require('express-async-handler')

const MedicalFile = require('../models/medicalFileModel')
const Operation = require('../models/operationModel')
const Treatment = require('../models/treatmentModel')
const Examination = require('../models/examinationModel')

// @desc Get medical file's operations
// @route GET /api/operations/:medicalFileId
// @access Private
const getMedicalFileOperations = asyncHandler(async (req, res) => {
    const {medicalFileId} = req.params

    const operations = await Operation.find({medicalFile: medicalFileId})

    res.status(200).json({operations})
})

// @desc Create new operation
// @route POST /api/operations
// @access Private
const createMedicalFileOperation = asyncHandler(async (req, res) => {
    const {dateTime, type, content, comments, file, fileId, userName, active, print} = req.body
    if(!dateTime || !type || !content || !file) {
        res.status(400)
        throw new Error('Please add all the fields')
    }

    // Get medicalFile using id
    const medicalFile = await MedicalFile.findById(fileId)
    let operation
    if(type === 'הנחיות') {
        operation = await Operation.create({
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
        operation = await Operation.create({
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
        operation = await Operation.create({
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
        let financed
        let result
        if(type === 'טיפול') {
            result = await Treatment.findOne({treatmentName: content})
        } else if(type === 'בדיקה') {
            result = await Examination.findOne({examinationName: content})
        }
        if(!result) {
            res.status(401)
            throw new Error('Not found')
        }
        financed = result.price ? true : false
        operation = await Operation.create({
            dateTime,
            type,
            content,
            comments,
            print,
            file,
            userName,
            user: req.user.id,
            medicalFile: medicalFile.id,
            financed: financed
        })

    }
    res.status(201).json(operation)
})

// @desc Delete operation
// @route DELETE /api/operations
// @access Private
const deleteOperarions = asyncHandler(async (req, res) => {
    const {body} = req.body
    await Operation.deleteMany({ _id: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Edit operation
// @route PUT /api/operations/:operationId
// @access Private
const updateOperation = asyncHandler(async(req, res) => {
    const operation = await Operation.findById(req.params.operationId)

    if(!operation) {
        res.status(404)
        throw new Error('Operation not found')
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
        let financed
        let result
        if(type === 'טיפול') {
            result = await Treatment.findOne({treatmentName: content})
        } else if(type === 'בדיקה') {
            result = await Examination.findOne({examinationName: content})
        }
        if(!result) {
            res.status(401)
            throw new Error('Not found')
        }
        financed = result.price ? true : false
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
    const updated = await Operation.findByIdAndUpdate(req.params.operationId, updatedOperation, {new: true})
    res.status(201).json(updated)
})


module.exports = {
    getMedicalFileOperations,
    createMedicalFileOperation,
    deleteOperarions,
    updateOperation
}

