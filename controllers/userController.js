const User = require('../models/User');
const express = require('express');
const router = express.Router()

// get a list of all users
router.get('/', async (req, res) => {
  
   try{
      const foundUsers = await User.find({});
      res.status(200).json(foundUsers) // res object holds methods to facilitate data and file transfer 
   }catch(error){
      res.status(400).json({
         msg: error.message
      })
   }
})

// create a new load
router.post('/', async (req, res) => {
   try{
      console.log(req.body)   
      const createdLoad = await User.create(req.body);
         res.status(200).json(createdLoad); 

   }catch(err){
      res.status(400).json({
         msg: err.message
      })
   }
})

// Update

router.put('/:id', async (req, res) => {
   try {
       const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true } )
       res.status(200).json(updatedUser);
   } catch (error) {
       res.status(400).json({
           msg: error.message
       })
   }
})

router.delete('/:id', async (req, res) => {
   try {
         const deletedUser = await User.findByIdAndDelete(req.params.id);
         res.status(200).json(deletedUser);
   }catch (error){
      res.status(400).json({
         msg: error.message
      })
   }
})

module.exports = router;