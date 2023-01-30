const mongoose = require('mongoose')

const operationSchema = mongoose.Schema({
    dateTime: {
        type: Date,
        required: [true, 'Please add an date and time']
    },
    type: {
        type: String,
        required: [true, 'Please add type of operation']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    active: {
        type: Boolean,
        required: [false]
    },
    print: {
        type: Boolean,
        required: [true, 'Please add print option']
    },
    comments: {
        type: String,
        required: [false]
    },
    file: {
        type: [String],
        required: [false]
    },
    userName: {
        type: String,
        required: [true, 'Please add user name']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: 'User'
    },
    medicalFile: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: 'MedicalFile'
    },
    financed: {
        type: Boolean,
        required: [false]
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Operation', operationSchema)