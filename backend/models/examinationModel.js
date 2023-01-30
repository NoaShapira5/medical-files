const mongoose = require('mongoose')

const examinationSchema = mongoose.Schema({
    examinationName: {
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

module.exports = mongoose.model('Examination', examinationSchema)