const express = require('express');
const path = require('path');
const cors = require('cors');
require('./auth/passport');
const dotenv = require('dotenv')
const passport = require('passport');
const mongoose = require('mongoose');

//Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


// secrets and other config data stored in env file
dotenv.config();

//Connect to db
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'));


// Init express
var app = express();
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
