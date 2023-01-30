const mongoose = require('mongoose')

const communitySchema = mongoose.Schema({
    communityName: {
        type: String,
        required: [true, 'Please enter name']
    },
})

module.exports = mongoose.model('Community', communitySchema)