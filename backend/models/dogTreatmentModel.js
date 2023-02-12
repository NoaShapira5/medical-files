const mongoose = require('mongoose')

const dogTreatmentSchema = mongoose.Schema({
    treatmentName: {
        type: String,
        required: [true, 'Please enter name']
    },
})

module.exports = mongoose.model('DogTreatment', dogTreatmentSchema)