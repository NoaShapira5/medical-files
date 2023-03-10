const asyncHandler = require('express-async-handler')

const CatMedicalFile = require('../models/catMedicalFileModel')
const CatOperation = require('../models/catOperationModel')
const Treatment = require('../models/treatmentModel')
const Examination = require('../models/examinationModel')

// @desc Get medical file's operations
// @route GET /api/operations/:medicalFileId
// @access Private
const getMedicalFileOperations = asyncHandler(async (req, res) => {
    const {medicalFileId} = req.params

    const operations = await CatOperation.find({medicalFile: medicalFileId})

    res.status(200).json({operations})
})

// @desc Create new operation
// @route POST /api/operations
// @access Private
const createMedicalFileOperation = asyncHandler(async (req, res) => {
    const {dateTime, type, content, comments, file, fileId, userName, active, print} = req.body
    if(!type || !content) {
        res.status(400)
        throw new Error('נא למלא את סוג ותוכן המהלך הרפואי')
    }

    // Get medicalFile using id
    const medicalFile = await CatMedicalFile.findById(fileId)
    let operation
    if(type === 'הנחיות') {
        operation = await CatOperation.create({
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
        operation = await CatOperation.create({
            dateTime,
            type,
            content,
            print,
            file,
            userName,
            user: req.user.id,
            medicalFile: medicalFile.id
        })
        
    } else if(type === 'טיפולים ותרופות') {
        operation = await CatOperation.create({
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
        if(type === 'טיפול לדיווח ותשלום') {
            result = await Treatment.findOne({treatmentName: content})
        } else if(type === 'בדיקה') {
            result = await Examination.findOne({examinationName: content})
        }
        if(!result) {
            res.status(401)
            throw new Error('Not found')
        }
        financed = result.price ? true : false
        operation = await CatOperation.create({
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
    await CatOperation.deleteMany({ _id: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Delete operations by medical file
// @route DELETE /api/operations/by-medicalfile
// @access Private
const deleteOperarionsByMedicalFile = asyncHandler(async (req, res) => {
    const {body} = req.body
    await CatOperation.deleteMany({ medicalFile: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Edit operation
// @route PUT /api/operations/:operationId
// @access Private
const updateOperation = asyncHandler(async(req, res) => {
    const operation = await CatOperation.findById(req.params.operationId)

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
    const updated = await CatOperation.findByIdAndUpdate(req.params.operationId, updatedOperation, {new: true})
    res.status(201).json(updated)
})


module.exports = {
    getMedicalFileOperations,
    createMedicalFileOperation,
    deleteOperarions,
    deleteOperarionsByMedicalFile,
    updateOperation
}

