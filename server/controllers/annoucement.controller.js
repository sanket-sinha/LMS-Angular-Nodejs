const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const Annoucement = mongoose.model('Annoucement');

module.exports.newAnnoucement = (req, res, next) => {
    var annoucement = new Annoucement();
    annoucement.title = req.body.title;
    annoucement.description = req.body.description;
    annoucement.date = req.body.date;
    annoucement.save((err, doc) => {
        if (!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    });
}

module.exports.getAnnoucement = (req,res,err)=>{
    Annoucement.find({},(err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    } );
}

module.exports.deleteAnnoucement = (req,res,err)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('Annoucement not found.');
    Annoucement.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log("Error : " + JSON.stringify(err, undefined, 2));}
    } );
}