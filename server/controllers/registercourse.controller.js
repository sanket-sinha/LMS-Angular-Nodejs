var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
require('../models/course.model');

const RegisterCourse = mongoose.model('Registercourse');

module.exports.registerCourse = (req, res, next) => {
    var registercourse = new RegisterCourse();
    registercourse.courseid = req.body.courseid;
    registercourse.studentid = req.body.studentid;
    registercourse.startingdate = req.body.startingdate;
    registercourse.expirydate = req.body.expirydate;
    registercourse.isexpired = req.body.isexpired;
    registercourse.save((err, doc) => {
        if (!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    });
}

module.exports.getRegisterCourseById = (req,res,err)=>{
    if(!req.params.id)
        return res.status(400).send('Registered Course not found.');
    RegisterCourse.find({studentid: req.params.id, isexpired: "false"},(err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    } );
}

module.exports.getCompletedCourseById = (req,res,err)=>{
    if(!req.params.id)
        return res.status(400).send('Registered Course not found.');
    RegisterCourse.find({studentid: req.params.id, isexpired: "true"},(err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    } );
}

module.exports.setExpiry = (req,res,err)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('Registered Course not found.');

    var register = {
        courseid: req.body.courseid,
        studentid: req.body.studentid,
        startingdate: req.body.startingdate,
        expirydate: req.body.expirydate,
        isexpired: req.body.isexpired,
    };
    RegisterCourse.findByIdAndUpdate(req.params.id, { $set: register }, { new: true }, (err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    } );
}

module.exports.getAllRegisterCourse = (req,res,err)=>{
    RegisterCourse.find({},(err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    } );
}