/* this will inject all environment variables from our
.env file into the process.env object.  We do this so that we can 
gitignore our .env file and load our env variables securely
*/

if(process.env.NODE_ENV !== 'production'){
   require('dotenv').config()
}
/* 
Express is out HTTP SERVER Framework
*/

const mongoose = require('mongoose');
const express = require('express'); 
const app = express();

// if you are accessing from multiple servers. . . ? 
const cors = require('cors');

// this is what is needed to create the app.delete function
// (which allows a user to log out)
const methodOverride = require('method-override');

/* Identifies where the app will run */
const PORT = process.env.PORT || 8800;

//mongoose.set('debug', true);
/* 
 Connects us to MongoDB
 It takes all of our MongoDB data and converts it from
 json to javascript objects.
 Also gives us crud features on MongoDB collections in
 raw js
*/



// MIDDLEWARE
////////////////
// MIDDLEWARE //
////////////////

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
	console.log("MIDDLEWARE LOG", req.body)
	next()
})
app.use(function (err, req, res, next) {
	console.log("ERROR HANDLER!", err, req, res)
	res.status(500)
	res.render('error', { error: err })
})

////////////
// ROUTES //
////////////

app.use('/', require('./controllers/rootController'))
app.use('/users', require('./controllers/userController'))
app.use('/admin', require('./controllers/adminController'))


const loadsRoute = require('./controllers/loadController');
app.use('/loads', loadsRoute);
// or one . . . 


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

/* middleware to prevent home page from loading when no one 
is logged in
*/


app.listen(PORT, () => { 
	console.log('app is running on port: ', PORT);
});
