//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const app = express ();
const db = mongoose.connection;
const Member = require('./models/member')
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

app.post('/members', (req, res) => {
  Member.create(req.body).then((createdMember) => {
    res.json(createdMember)
  })
})

app.get('/members', (req, res) => {
  Member.find({}).then((foundMember) => {
    res.json(foundMember)
  })
})
app.get('/members/:id', (req, res) => {
  Member.findById(req.params.id).then((foundMember) => {
    res.json(foundMember)
  })
})

app.delete('/members/:id', (req, res) => {
  Member.findByIdAndRemove(req.params.id).then((deletedMember) => {
    res.json(deletedMember)
  })
})

app.put('/members/:id', (req, res) => {
  Member.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((updatedMember) => res.json(updatedMember))
})

//////////////////////////////////////
//////////// WORKER API ///////////////
///////////////////////////////////////

app.post('/workers', (req, res) => {
  Worker.create(req.body).then((createdWorker) => {
    res.json(createdWorker)
  })
})

app.get('/workers', (req, res) => {
  Worker.find({}).then((foundWorker) => {
    res.json(foundWorker)
  })
})

app.delete('/workers/:id', (req, res) => {
  Worker.findByIdAndRemove(req.params.id).then((deletedWorker) => {
    res.json(deletedWorker)
  })
})

app.put('/workers/:id', (req, res) => {
  Worker.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((updatedWorker) => res.json(updatedWorker))
})



//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));