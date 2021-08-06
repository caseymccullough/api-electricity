const Load = require('../models/Load');
const express = require('express');
const uuidv4 = require('uuid');
const router = express.Router()

// get a list of all loads
router.get('/', async (req, res) => {
   try{
      const foundLoads = await Load.find({});
      res.status(200).json(foundLoads) // res object holds methods to facilitate data and file transfer 
   }catch(error){
      res.status(400).json({
         msg: error.message
      })
   }
})

// get an individual load by id
router.get('/:loadId', async (req, res) => {
   try{
      const load = await Load.findById(req.params.loadId);
      res.status(200).json(load) // res object holds methods to facilitate data and file transfer 
   }catch(error){
      res.status(400).json({
         msg: error.message
      })
   }
})

// create a new load
router.post('/', async (req, res) => {
   try{
      const load = req.body;
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

// DELETE
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