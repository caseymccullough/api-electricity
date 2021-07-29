
require('dotenv').config() /* 
 this will inject all environment variables from our
 .env file into the process.env object
 that is standard in NodeJS.
 We do this so that we can gitignore our .env file
 and load our env variables securely
*/
const express = require('express'); /* 
Express is out HTTP SERVER Framework
*/
const mongoose = require('mongoose'); /* 
 Connects us to MongoDB
 It takes all of our MongoDB data and converts it from
 json to javascript objects.
 Also gives us crud features on MongoDB collections in
 raw js
*/

const cors = require('cors');

const User = require('./models/User');
const Load = require('./models/Load');

const app = express();
const PORT = process.env.PORT || 8800;


// define my database and middleware
mongoose.connect(process.env.MONGO_URI, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false
})
mongoose.connection.once('connected', () => console.log('Connected to Mongo Life is Good'));
app.use(express.json());
//app.use(bodyParser.json());

app.use(cors());
app.use('/load', require('./controllers/loadController'))
app.use('/user', require('./controllers/userController'))
//define my database and middleware


// INDEX
app.get('/', (req, res) => {
   res.send(`<h1>Electricity API</h1>`)
})

app.get('/test', (req, res) => {
   console.log('req.query: ', req.query);
   res.send('someroute accessed');
 });


// New <----- dont need this
// Delete 
app.delete('/:id')
{
   console.log ("call to deletebyid");
}

// Update 
// Create
// Edit <------- dont need this
// Show
app.listen(PORT, () => { 
	console.log('app is running on port: ', PORT);
});
