var express = require('express');
var mainRouter = require('./routes/routes');
conf = require('./config/config');
helper = require('./lib/comm_fun');
var data_sync = require('./lib/data_driver');
//require('express-async-errors')
data_sync.sync_all_chain();
var app = express();
var path = require('path');
app.use('/', mainRouter);

// app.use( (error,req,res,next) =>{n
//     res.send('something went wrong')
// })

module.exports = app;

