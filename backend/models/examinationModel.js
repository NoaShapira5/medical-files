const mongoose = require('mongoose')

const examinationSchema = mongoose.Schema({
    examinationName: {
        type: String,
        required: [true, 'Please enter name']
    },
    price: {
        type: Number,
        required: [true, 'Please enter price']
    }
})

module.exports = mongoose.model('Examination', examinationSchema)