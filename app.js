/**
 * Created by Vivek Reddy on 02-Jul-17.
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', function () {
    console.log('connected to the database' +config.database);
})
mongoose.connection.on('error', function (err) {
    console.log('database error' +err);
})

const app = express();
const users =  require('./routes/users');
const maps =  require('./routes/maps');
const port = 4000;

//Cors middleware
app.use(cors());

//Set static folders
app.use(express.static(path.join(__dirname, 'public')))

//Body Parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);
app.use('/maps', maps);

//Index route
app.get('/', function(req, res){
res.send('Invalid end point');
});

app.get('*', function(req, res){
   res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start server
app.listen(port, function() {
   console.log('Server started on port '+port);
});