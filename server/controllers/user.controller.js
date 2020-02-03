const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;


const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.telephone = req.body.telephone;
    user.address = req.body.address;
    user.city = req.body.city;
    user.pincode = req.body.pincode;
    user.role = req.body.role;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['_id','fullName','email','telephone','address','city','pincode','password','role']) });
        }
    );
}

module.exports.getstudentsProfile = (req, res, next) =>{
    User.find({role: "student"},(err, doc) => {
        if (err)
            return res.status(404).json({ status: false, message: 'User record not found.' });
        else
            return res.send(doc);
    })
}

module.exports.getUserProfile = (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('User record not found.');
    User.findById(req.params.id,(err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    } );
}

module.exports.userUpdate = (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('User record not found.');
    else{
        
        var user = {
            fullName: req.body.fullName,
            email: req.body.email,
            telephone: req.body.telephone,
            address: req.body.address,
            city: req.body.city,
            pincode: req.body.pincode,
            
        };
        User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err,doc)=>{
            if(!err) { res.send(doc);}
            else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
        } );

    }
    
}