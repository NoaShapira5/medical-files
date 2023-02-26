const mongoose = require('mongoose')

const catMedicalFileSchema = mongoose.Schema({
    arrivalDate: {
        type: Date,
        required: [true, 'Please add an arrival date']
    },
    cageNum: {
        type: Number,
        required: [true, 'Please add cage number']
    },
    refNum: {
        type: String,
        required: [true, 'Please add refrence number']
    },
    refName: {
        type: String,
        required: [false]
    },
    refDesc: {
        type: String,
        required: [false]
    },
    trappingAd: {
        type: String,
        required: [false]
    },
    community: {
        type: String,
        required: [false]
    },
    feederName: {
        type: String,
        required: [false]
    },
    phoneOne: {
        type: String,
        required: [false]
    },
    phoneTwo: {
        type: String,
        required: [false]
    },
    gender: {
        type: String,
        required: [false]
    },
    neuteringStatus: {
        type: String,
        required: [false]
    },
    age: {
        type: String,
        required: [false]
    },    
    color: {
        type: String,
        required: [false]
    },
    images: {
        type: [String],
        required: [false]
    },
    history: {
        type: String,
        required: [false]
    },
    physicalCon: {
        type: String,
        required: [false]
    },
    severityLev: {
        type: String,
        required: [false]
    },
    medicalProb: {
        type: String,
        required: [false]
    },
    mainDiagnosis: {
        type: String,
        required: [false]
    },
    secondaryDiagnosis: {
        type: String,
        required: [false]
    },
    hospitalizationCageNum: {
        type: Number,
        required: [false]
    },
    hospitalStartDate: {
        type: Date,
        required: [false]
    },
    hospitalEndDate: {
        type: Date,
        required: [false]
    },
    totalHospitalDays: {
        type: Number,
        required: [false]
    },
    neuteringDate: {
        type: Date,
        required: [false]
    },
    releaseDate: {
        type: Date,
        required: [false]
    },
    releaseLocation: {
        type: String,
        required: [false]
    },
    death: {
        type: String,
        required: [false]
    },
    userName: {
        type: String,
        required: [true, 'Please add user name']
    },
    examinations: {
        type: String,
        required: [false]
    },
    imaging: {
        type: String,
        required: [false]
    },
    nonSurgical: {
        type: String,
        required: [false]
    },
    surgical: {
        type: String,
        required: [false]
    },
    totalFinanced: {
        type: Number,
        required: false
    }

},
{
    timestamps: true
})

module.exports = mongoose.model('CatMedicalFile', catMedicalFileSchema)