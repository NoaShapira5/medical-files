const mongoose = require('mongoose')

const treatmentSchema = mongoose.Schema({
    treatmentName: {
        type: String,
        required: [true, 'Please enter name']
    },
    price: {
        type: Number,
        required: [true, 'Please enter price']
    }
})

module.exports = mongoose.model('Treatment', treatmentSchema)