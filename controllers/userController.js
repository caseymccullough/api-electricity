const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Load = require('../models/Load');

//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');


/*///////////////
 * 
 * SHOW ALL ROUTES
 * 
 *///////////////

// GET a list of all users
router.get('/', async (req, res) => {
  
   try{
      const foundUsers = await User.find({});
      res.status(200).json(foundUsers); // res object holds methods to facilitate data and file transfer 
   }catch(error){
      res.status(400).json({
         msg: error.message
      })
   }
})

// SUBMIT A USER
router.post('/', async (req, res) => {
   try {     
      const user = await new User ({
         username: req.body.username,
         password: req.body.password
      });
      const createdUser = await User.create(user);
      res.status(200).json(createdUser); 
   }catch(err){
      res.status(400).json({
         msg: err.message
      })
   }
});

// GET A SPECIFIC USER
router.get('/:userId', async (req, res) => {
   try{
      const user = await User.findById(req.params.userId);
      res.json(user);
   } catch (err) {
      res.json( {message: err});
   }
});

// UPDATE A USER WITH A NEW LOAD
router.patch('/:userId/addLoad', async (req, res) => {
   try{
      console.log ("in the patch addLoad function");

      const currentUser = await User.findById(req.params.userId);  
      currentUser.loads.push(req.body.loadId);
 
      await currentUser.save(); // sends an updateOne() request.

      res.json(currentUser);
   }catch (err){
      res.json({message: err});
   }
});

module.exports = router;