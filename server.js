var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const flash = require('express-flash');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
var cookieSession = require('cookie-session');

//routes
const authRoutes = require('./routes/Auth');
const timesheetRoutes = require('./routes/Timesheet');
const venueRoutes = require('./routes/Venue');

var passport = require('passport');
var secret = require('./configs/secret');
var app = express();

mongoose.connect(secret.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [secret.cookieKey]
  }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(flash());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session())
//adding routes

app.use('/api',[authRoutes,venueRoutes,timesheetRoutes]);

//  app.get('*',(req,res,next)=>{
//    res.sendFile(path.join(__dirname + '/client/build/index.html'));

//   });
  



app.listen(secret.port, function(err) {
  if (err) throw err;
  console.log("Server is Running on port " + secret.port);
});