const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    coursename: {
        type: String,
        required: 'Course name can\'t be empty'
    },
    coursecode: {
        type: String,
        required: 'Course code can\'t be empty',
        unique: true
    },
    courseprice: {
        type: String,
        required: 'Price can\'t be empty',
    },
    discountedprice: {
        type: String
    },
    courseduration: {
        type: String,
        required: 'Duration can\'t be empty'
    },
    teachername: {
        type: String,
        required: 'Teacher Name can\'t be empty'
    },
    coursedescription: {
        type: String,
        required: 'Description can\'t be empty',
    },
    coursecategory: {
        type: String,
        required: 'Category can\'t be empty',
    },
    coursepicture: {
        type: String,
        required: 'Picture can\'t be empty',
    },
    lesson: [mongoose.Schema.Types.Mixed]
});

mongoose.model('Course', courseSchema);