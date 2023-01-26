const mongoose = require('mongoose')

const medicalFileSchema = mongoose.Schema({
    arrivalDate: {
        type: Date,
        required: [true, 'Please add an arrival date']
    },
    cageNum: {
        type: Number,
        required: [true, 'Please add cage number']
    },
    refNum: {
        type: Number,
        required: [true, 'Please add refrence number']
    },
    refName: {
        type: String,
        required: [true, 'Please add refrence name']
    },
    refDesc: {
        type: String,
        required: [true, 'Please add refrence description']
    },
    trappingAd: {
        type: String,
        required: [true, 'Please add trapping address']
    },
    community: {
        type: String,
        required: [true, 'Please add community']
    },
    feederName: {
        type: String,
        required: [true, 'Please add feeder name']
    },
    phoneOne: {
        type: String,
        required: [true, 'Please add phone number']
    },
    phoneTwo: {
        type: String,
        required: [true, 'Please add phone number']
    },
    gender: {
        type: String,
        required: [true, 'Please add cat gender']
    },
    neuteringStatus: {
        type: Boolean,
        required: [true, 'Please add cat neutering status ']
    },
    age: {
        type: Number,
        required: [true, 'Please add cat age']
    },
    color: {
        type: String,
        required: [true, 'Please add cat color']
    },
    images: {
        type: [String],
        required: [true, 'Please add images']
    },
    history: {
        type: [String],
        required: [true, 'Please add history']
    },
    physicalCon: {
        type: Number,
        required: [true, 'Please add cat physical condition']
    },
    severityLev: {
        type: Number,
        required: [true, 'Please add severity level']
    },
    medicalProb: {
        type: String,
        required: [true, 'Please add medical problem']
    },
    mainDiagnosis: {
        type: String,
        required: [true, 'Please add main diagnosis']
    },
    secondaryDiagnosis: {
        type: String,
        required: [true, 'Please add secondary diagnosis']
    },
    hospitalStartDate: {
        type: Date,
        required: [true, 'Please add hospitalization start date']
    },
    hospitalEndDate: {
        type: Date,
        required: [true, 'Please add hospitalization end date']
    },
    totalHospitalDays: {
        type: Number,
        required: [true, 'Please add total hospitalization days']
    },
    neuteringDate: {
        type: Date,
        required: [true, 'Please add neutering date']
    },
    releaseDate: {
        type: Date,
        required: [true, 'Please add release date']
    },
    releaseLocation: {
        type: String,
        required: [true, 'Please add release location']
    }

},
{
    timestamps: true
})

module.exports = mongoose.model('MedicalFile', medicalFileSchema)