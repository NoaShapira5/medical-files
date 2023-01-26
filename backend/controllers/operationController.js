const asyncHandler = require('express-async-handler')

const MedicalFile = require('../models/medicalFileModel')
const Operation = require('../models/operationModel')
const User = require('../models/userModel')

// @desc Get medical file's operations
// @route GET /api/operations/:medicalFileId
// @access Private
const getMedicalFileOperations = asyncHandler(async (req, res) => {
    const {medicalFileId} = req.params

    const operations = await Operation.find({medicalFile: medicalFileId})

    if(operations.length === 0) {
        res.status(401)
        throw new Error('Medical files operations not found')
    }

    res.status(200).json({operations})
})

// @desc Create new operation
// @route POST /api/operations
// @access Private
const createMedicalFileOperation = asyncHandler(async (req, res) => {
    const {dateTime, type, content, comments, file, fileId, userName, active, history} = req.body

    if(!dateTime || !type || !content || !file) {
        res.status(400)
        throw new Error('Please add all the fields')
    }

    // Get medicalFile using id
    const medicalFile = await MedicalFile.findById(fileId)

    const operation = await Operation.create({
        dateTime,
        type,
        content,
        active,
        history,
        comments,
        file,
        userName,
        user: req.user.id,
        medicalFile: medicalFile.id
    })
    res.status(201).json(operation)
})

module.exports = {
    getMedicalFileOperations,
    createMedicalFileOperation
}

