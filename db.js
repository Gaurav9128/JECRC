const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://JECRC:Jecrc@jecrc.clbnpk2.mongodb.net/JECRC';

mongoose.connect(mongoURL,{useUnifiedTopology : true, useNewURLParser:true})

 var connection =mongoose.connection

connection.on('error', () => {
    console.error('MongoDB Connection failed:', err);
});

connection.on('connected', () => {
    console.log('MongoDB Connection Successful');
});


module.exports = mongoose;
