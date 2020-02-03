const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlCourse = require('../controllers/course.controller');
const ctrlRegisterCourse = require('../controllers/registercourse.controller');
const ctrlAnnoucement = require('../controllers/annoucement.controller');
const path = require('path');
const multer = require('multer');
const jwtHelper = require('../config/jwtHelper');
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../Frontend/src/assets/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});

var upload = multer({
    storage: storage
});

//user
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/user/:id',ctrlUser.getUserProfile);
router.get('/studentsprofile',ctrlUser.getstudentsProfile);
router.patch('/user/:id',ctrlUser.userUpdate);

//course
router.post('/uploadfile', upload.array('file',100),ctrlCourse.uploadFile);
router.post('/newcourse', ctrlCourse.newCourse);
router.get('/getallcourses', ctrlCourse.getAllCourse);
router.get('/getcourse/:code',ctrlCourse.getCoursebyCode);
router.get('/getcoursebyid/:id',ctrlCourse.getCoursebyId);
router.patch('/updatecourse/:id',ctrlCourse.updateCourse);
router.delete('/deletecourse/:id',ctrlCourse.deleteCourse);

//registercourse
router.post('/registercourse',ctrlRegisterCourse.registerCourse);
router.get('/getregistercoursebyid/:id',ctrlRegisterCourse.getRegisterCourseById);
router.get('/getcompletedcoursebyid/:id',ctrlRegisterCourse.getCompletedCourseById);
router.get('/getallregistercourse',ctrlRegisterCourse.getAllRegisterCourse);
router.patch('/setexpiry/:id',ctrlRegisterCourse.setExpiry);

//annoucement
router.post('/newannoucement',ctrlAnnoucement.newAnnoucement);
router.get('/getallannoucement',ctrlAnnoucement.getAnnoucement);
router.delete('/deleteannoucement/:id',ctrlAnnoucement.deleteAnnoucement);

module.exports = router;