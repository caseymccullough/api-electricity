
/* 
Express is out HTTP SERVER Framework
*/
const express = require('express'); 
const app = express();

/* this will inject all environment variables from our
.env file into the process.env object
that is standard in NodeJS. We do this so that we can 
gitignore our .env file and load our env variables securely
*/
require('dotenv').config() 

/* Identifies where the app will run */
const PORT = process.env.PORT || 8800;

const mongoose = require('mongoose');
//mongoose.set('debug', true);
/* 
 Connects us to MongoDB
 It takes all of our MongoDB data and converts it from
 json to javascript objects.
 Also gives us crud features on MongoDB collections in
 raw js
*/

// first do npm install cors
// if you are accessing from multiple servers. . . ? 
const cors = require('cors');

// MIDDLEWARE
app.use(cors());
app.use(express.json());


/* IMPORT ROUTES
in two steps . . . */
const loadsRoute = require('./controllers/loadController');
app.use('/loads', loadsRoute);
// or one . . . 
app.use('/users', require('./controllers/userController'))


// ROUTES
app.get('/', (req, res) => {
   res.send(`<h1>Electricity API</h1>`)
})

// define my database and middleware
mongoose.connect(process.env.MONGO_URI, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false
})
mongoose.connection.once('connected', () => console.log('Connected to Mongo Life is Good'));

app.listen(PORT, () => { 
	console.log('app is running on port: ', PORT);
});
