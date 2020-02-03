const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const crypto = require('crypto')
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const fs = require('fs');
require('../models/course.model');

let gfs;
const Course = mongoose.model('Course');

module.exports.uploadFile = (req, res, next) => {

    console.log(req.files);

    const files = req.files;
    if(!files){ return res.status(400).send('please upload a file'); }
    res.send(files);
}

module.exports.newCourse = (req, res, next) => {
    var course = new Course();
    course.coursename = req.body.coursename;
    course.coursecode = req.body.coursecode;
    course.courseprice = req.body.courseprice;
    course.discountedprice = req.body.discountedprice;
    course.courseduration = req.body.courseduration;
    course.teachername = req.body.teachername;
    course.coursepicture = req.body.coursepicture;
    course.coursedescription = req.body.coursedescription;
    course.coursecategory = req.body.coursecategory;
    course.lesson = req.body.lesson;
    course.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate data found.']);
            else
                return next(err);
        }

    });
}

module.exports.getAllCourse = (req,res,err)=>{
    Course.find({},(err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    } );
}

module.exports.getCoursebyCode = (req,res,err)=>{
    if(!req.params.code)
        return res.status(400).send('Course record not found.');
    Course.find({coursecode: req.params.code},(err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    } );
}

module.exports.getCoursebyId = (req,res,err)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('Course not found.');
    Course.findById(req.params.id,(err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    } );
}

module.exports.updateCourse = (req,res,error)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('Course not found.');
    else{
        var course = {
            coursename: req.body.coursename,
        coursecode: req.body.coursecode,
        courseprice: req.body.courseprice,
        discountedprice : req.body.discountedprice,
        courseduration : req.body.courseduration,
        teachername : req.body.teachername,
        coursepicture : req.body.coursepicture,
        coursedescription : req.body.coursedescription,
        coursecategory : req.body.coursecategory,
        lesson : req.body.lesson,
        }
        
        Course.findByIdAndUpdate(req.params.id, { $set: course }, { new: true }, (err,doc)=>{
            if(!err) { res.send(doc);}
            else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
        } );
    }
}

module.exports.deleteCourse = (req,res,error)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('Course not found.');
    Course.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    } );
    }