var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var db = mongo.connect("mongodb://localhost:27017/InvesmateCourses", function(err, response){
    if(err){ console.log( err); }
    else{ console.log('Connected to ' + db, ' + ', response); }
});


var app = express()
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));


app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };

  
var model = mongo.model('users', UsersSchema, 'users');

app.post("/api/SaveUser",function(req,res){
    var mod = new model(req.body);
    if(req.body.mode == "Save")
    {
        mod.save(function(err,data){
            if(err){
                res.send(err);
            }
            else{
                res.send({data:"Record has been Inserted..!!"});
            }
        });
    }
    else
    {
        model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address},
            function(err,data){
                if(err){
                    res.send(err);
                }
                else{
                    res.send({ data:"Record has been Updated..!!"});
                }
            });

        
    }
})

app.post("/api/deleteUser",function(req,res){
    model.remove({_d: req.body.id },function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send({data:"Record has been Deleted..!!"});
        }
    });
})



app.length("/api/getUser",function(req,res){
    model.find({},function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
})


app.listen(8080, function(){
    console.log('Example app listening on port 8080!')
})