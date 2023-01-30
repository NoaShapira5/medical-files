const mongoose = require('mongoose')

const diagnosisSchema = mongoose.Schema({
    diagnosisName: {
        type: String,
        required: [true, 'Please enter name']
    },
})

module.exports = mongoose.model('Diagnosis', diagnosisSchema)