const mongoose = require('mongoose')

const treatmentSchema = mongoose.Schema({
    treatmentName: {
        type: String,
        required: [true, 'Please enter name']
    },
    price: {
        type: Number,
        required: [false]
    },
    range: {
        type: [Number],
        required: [false]
    }
})

module.exports = mongoose.model('Treatment', treatmentSchema)