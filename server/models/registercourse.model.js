const mongoose = require('mongoose');

var registercourseSchema = new mongoose.Schema({
    courseid: {
        type: String,
        required: 'Course ID can\'t be empty'
    },
    studentid: {
        type: String,
        required: 'Student ID can\'t be empty',
       
    },
    startingdate: {
        type: String,
        required: 'Starting Date can\'t be empty',
    },
    expirydate: {
        type: String,
        required: 'Expiry Date can\'t be empty'
    },
    isexpired: {
        type: Boolean,
        required: 'isexpired can\'t be empty'
    },
});

mongoose.model('Registercourse', registercourseSchema);