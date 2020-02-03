const mongoose = require('mongoose');

mongoose.set('useCreateIndex',true);
mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.set('useFindAndModify',false);
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});



require('./user.model');
require('./course.model');
require('./registercourse.model');
require('./annoucement.model');