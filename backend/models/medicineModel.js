const mongoose = require('mongoose')

const medicineSchema = mongoose.Schema({
    medicineName: {
        type: String,
        required: [true, 'Please enter name']
    },
})

module.exports = mongoose.model('Medicine', medicineSchema)