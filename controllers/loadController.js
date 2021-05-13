const Load = require('../models/Load');
const express = require('express');
const router = express.Router()

// get a list of all loads
router.get('/', async (req, res) => {
   //res.send(`<h1>Here be all the loads. . </h1>`)
  
   try{
      const foundLoads = await Load.find({});
      res.status(200).json(foundLoads) // res object holds methods to facilitate data and file transfer 
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
      const createdLoad = await Load.create(req.body);
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
       const updatedLoad = await Load.findByIdAndUpdate(req.params.id, req.body, { new: true } )
       res.status(200).json(updatedLoad);
   } catch (error) {
       res.status(400).json({
           msg: error.message
       })
   }
})

router.delete('/:id', async (req, res) => {
   try {
         const deletedLoad = await Load.findByIdAndDelete(req.params.id);
         res.status(200).json(deletedLoad);
   }catch (error){
      res.status(400).json({
         msg: error.message
      })
   }
})

module.exports = router;