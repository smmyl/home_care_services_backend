//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const app = express ();
const db = mongoose.connection;
const Home = require('./models/home')
const Worker = require('./models/worker')
require('dotenv').config()
//___________________
//Port 3000
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI)

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));
app.use(cors());

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});


////////////////////////////////////
//////// USER PAGE API //////////////
/////////////////////////////////////

app.post('/homecare', (req, res) => {
  Home.create(req.body).then((createdHome) => {
    res.json(createdHome)
  })
})

app.get('/homecare', (req, res) => {
  Home.find({}).then((foundHome) => {
    res.json(foundHome)
  })
})

app.delete('/homecare/:id', (req, res) => {
  Home.findByIdAndRemove(req.params.id).then((deletedHome) => {
    res.json(deletedHome)
  })
})

app.put('/homecare/:id', (req, res) => {
  Home.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((updatedHome) => res.json(updatedHome))
})

//////////////////////////////////////
//////////// WORKER API ///////////////
///////////////////////////////////////

app.post('/homecare', (req, res) => {
  Worker.create(req.body).then((createdWorker) => {
    res.json(createdWorker)
  })
})

app.get('/homecare', (req, res) => {
  Worker.find({}).then((foundWorker) => {
    res.json(foundWorker)
  })
})

app.delete('/homecare/:id', (req, res) => {
  Worker.findByIdAndRemove(req.params.id).then((deletedWorker) => {
    res.json(deletedWorker)
  })
})

app.put('/homecare/:id', (req, res) => {
  Worker.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((updatedWorker) => res.json(updatedWorker))
})



//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));