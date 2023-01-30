const asyncHandler = require('express-async-handler')

const Medicine = require('../models/medicineModel')
const Treatment = require('../models/treatmentModel')
const Examination = require('../models/examinationModel')
const Diagnosis = require('../models/diagnosisModel')
const Community = require('../models/communityModel')

// @desc Get community
// @route GET /api/managment/community 
// @access Private
const getCommunity = asyncHandler(async (req, res) => {

    const community = await Community.find({})

    res.status(200).json({community})
})

// @desc Create new community
// @route POST /api/managment/community
// @access Private
const createCommunity = asyncHandler(async (req, res) => {
    const {communityName} = req.body

    if(!communityName) {
        res.status(400)
        throw new Error('Please add all the fields')
    }

    const community = await Community.create({
        communityName,
    })
    res.status(201).json(community)
})

// @desc Get diagnosis
// @route GET /api/managment/diagnosis 
// @access Private
const getDiagnosis = asyncHandler(async (req, res) => {

    const diagnosis = await Diagnosis.find({})

    res.status(200).json({diagnosis})
})

// @desc Create new diagnosis
// @route POST /api/managment/diagnosis
// @access Private
const createDiagnosis = asyncHandler(async (req, res) => {
    const {diagnosisName} = req.body

    if(!diagnosisName) {
        res.status(400)
        throw new Error('Please add all the fields')
    }

    const diagnosis = await Diagnosis.create({
        diagnosisName,
    })
    res.status(201).json(diagnosis)
})

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
    const {treatmentName, price, range} = req.body
    let treatment

    if(!treatmentName) {
        res.status(400)
        throw new Error('Please add all the fields')
    }
    if(price) {
        treatment = await Treatment.create({
            treatmentName,
            price,
            range
        })
    } else {
        treatment = await Treatment.create({
            treatmentName
        })
    }


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
    const {examinationName, price, range} = req.body
    let examination

    if(!examinationName) {
        res.status(400)
        throw new Error('Please add name')
    }
    if(price) {
        examination = await Examination.create({
            examinationName,
            price,
            range
        })
    } else {
        examination = await Examination.create({
            examinationName
        })
    }

    res.status(201).json(examination)
})

module.exports = {
    getCommunity,
    createCommunity,
    getDiagnosis,
    createDiagnosis,
    getMedicines,
    createMedicine,
    getTreatments,
    createTreatment,
    getExaminations,
    createExamination
}