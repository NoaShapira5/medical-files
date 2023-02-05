const asyncHandler = require('express-async-handler')

const Medicine = require('../models/medicineModel')
const Treatment = require('../models/treatmentModel')
const Examination = require('../models/examinationModel')
const Diagnosis = require('../models/diagnosisModel')
const Community = require('../models/communityModel')

// @desc Get community
// @route GET /api/management/community 
// @access Private
const getCommunity = asyncHandler(async (req, res) => {

    const community = await Community.find({})

    res.status(200).json({community})
})

// @desc Create new community
// @route POST /api/management/community
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

// @desc Delete communities
// @route DELETE /api/management/community
// @access Private
const deleteCommunities = asyncHandler(async (req, res) => {
    const {body} = req.body
    await Community.deleteMany({ _id: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Update community
// @route PUT /api/management/community/:communityId
// @access Private
const updateCommunity = asyncHandler(async (req, res) => {
    const community = await Community.findById(req.params.communityId)

    if(!community) {
        res.status(404)
        throw new Error('הרשות המקומית לא נמצאה')
    }

    const updatedCommunity = await Community.findByIdAndUpdate(req.params.communityId, req.body, {new: true})

    res.status(200).json(updatedCommunity)
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

// @desc Delete diagnoses
// @route DELETE /api/management/diagnosis
// @access Private
const deleteDiagnoses = asyncHandler(async (req, res) => {
    const {body} = req.body
    await Diagnosis.deleteMany({ _id: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Update diagnosis
// @route PUT /api/management/diagnosis/:diagnosisId
// @access Private
const updateDiagnosis = asyncHandler(async (req, res) => {
    const diagnosis = await Diagnosis.findById(req.params.diagnosisId)

    if(!diagnosis) {
        res.status(404)
        throw new Error('האבחנה לא נמצאה')
    }

    const updatedDiagnosis = await Diagnosis.findByIdAndUpdate(req.params.diagnosisId, req.body, {new: true})

    res.status(200).json(updatedDiagnosis)
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

// @desc Delete medicines
// @route DELETE /api/management/medicine
// @access Private
const deleteMedicines = asyncHandler(async (req, res) => {
    const {body} = req.body
    await Medicine.deleteMany({ _id: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Update medicine
// @route PUT /api/management/medicine/:medicineId
// @access Private
const updateMedicine = asyncHandler(async (req, res) => {
    const medicine = await Medicine.findById(req.params.medicineId)

    if(!medicine) {
        res.status(404)
        throw new Error('התרופה לא נמצאה')
    }

    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.medicineId, req.body, {new: true})

    res.status(200).json(updatedMedicine)
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

// @desc Delete treatments
// @route DELETE /api/management/treatment
// @access Private
const deleteTreatments = asyncHandler(async (req, res) => {
    const {body} = req.body
    await Treatment.deleteMany({ _id: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Update treatment
// @route PUT /api/management/treatment/:treatmentId
// @access Private
const updateTreatment = asyncHandler(async (req, res) => {
    const treatment = await Treatment.findById(req.params.treatmentId)

    if(!treatment) {
        res.status(404)
        throw new Error('Treatment not found')
    }

    const updatedTreatment = await Treatment.findByIdAndUpdate(req.params.treatmentId, req.body, {new: true})

    res.status(200).json(updatedTreatment)
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

// @desc Delete examinations
// @route DELETE /api/management/examination
// @access Private
const deleteExaminations = asyncHandler(async (req, res) => {
    const {body} = req.body
    await Examination.deleteMany({ _id: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Update examination
// @route PUT /api/management/examination/:examinationId
// @access Private
const updateExamination = asyncHandler(async (req, res) => {
    const examination = await Examination.findById(req.params.examinationId)

    if(!examination) {
        res.status(404)
        throw new Error('הבדיקה לא נמצאה')
    }

    const updatedExamination = await Examination.findByIdAndUpdate(req.params.examinationId, req.body, {new: true})

    res.status(200).json(updatedExamination)
})

module.exports = {
    getCommunity,
    createCommunity,
    deleteCommunities,
    updateCommunity,
    getDiagnosis,
    createDiagnosis,
    deleteDiagnoses,
    updateDiagnosis,
    getMedicines,
    createMedicine,
    deleteMedicines,
    updateMedicine,
    getTreatments,
    createTreatment,
    deleteTreatments,
    updateTreatment,
    getExaminations,
    createExamination,
    deleteExaminations,
    updateExamination
}