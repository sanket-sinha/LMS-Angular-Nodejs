const mongoose = require('mongoose');

var annoucementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title can\'t be empty'
    },
    description: {
        type: String,
        required: 'Description can\'t be empty',
       
    },
    date: {
        type: Date,
        required: 'Date can\'t be empty',
    }
});

mongoose.model('Annoucement', annoucementSchema);