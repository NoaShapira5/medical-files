const asyncHandler = require('express-async-handler')

const Medicine = require('../models/medicineModel')
const Treatment = require('../models/treatmentModel')
const Examination = require('../models/examinationModel')

// @desc Get medicines
// @route GET /api/managment/medicines 
// @access Private
const getMedicines = asyncHandler(async (req, res) => {

    const medicines = await Medicine.find({})

    res.status(200).json({medicines})
})

// @desc Create new medicine
// @route POST /api/managment/medicine
// @access Private
const createMedicine = asyncHandler(async (req, res) => {
    const {medicineName} = req.body

    if(!medicineName) {
        res.status(400)
        throw new Error('Please add all the fields')
    }

    const medicine = await Medicine.create({
        medicineName,
    })
    res.status(201).json(medicine)
})

// @desc Get treatments
// @route GET /api/managment/treatments
// @access Private
const getTreatments = asyncHandler(async (req, res) => {

    const treatments = await Treatment.find({})

    res.status(200).json({treatments})
})

// @desc Create new treatment
// @route POST /api/managment/treatment
// @access Private
const createTreatment = asyncHandler(async (req, res) => {
    const {treatmentName, price} = req.body

    if(!treatmentName || !price) {
        res.status(400)
        throw new Error('Please add all the fields')
    }

    const treatment = await Treatment.create({
        treatmentName,
        price
    })
    res.status(201).json(treatment)
})

// @desc Get examinations
// @route GET /api/managment/examinations
// @access Private
const getExaminations = asyncHandler(async (req, res) => {

    const examinations = await Examination.find({})

    res.status(200).json({examinations})
})

// @desc Create new examination
// @route POST /api/managment/examination
// @access Private
const createExamination = asyncHandler(async (req, res) => {
    const {examinationName, price} = req.body

    if(!examinationName || !price) {
        res.status(400)
        throw new Error('Please add all the fields')
    }

    const examination = await Examination.create({
        examinationName,
        price
    })
    res.status(201).json(examination)
})

module.exports = {
    getMedicines,
    createMedicine,
    getTreatments,
    createTreatment,
    getExaminations,
    createExamination
}