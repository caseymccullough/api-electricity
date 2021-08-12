const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const { hash, auth } = require('./authController');
const SECRET = process.env.SECRET_KEY;

const User = require('../models/User');
const Load = require('../models/Load');


// SHOW ROUTES ////////////////////////////////////////////

router.get('/', async (req, res) => {
	res.json({msg: "root of users"})
})

// GET A SPECIFIC USER
// router.get('/:userId', auth, async (req, res) => {
//    try{
//       const userQuery = await User.findById(req.params.userId);
// 		userQuery.exec((err, foundUser) => {
// 			if (err) res.status(400).json({ msg: err.message })
// 			else res.status(200).json(foundUser)
// 		})
//    } catch (err) {
//       res.json( {message: err});
//    }
// });

// GET user by username
router.get('/:username', (req, res) => {
	const userQuery = User.findOne({ username: req.params.username }).select('-password')
	userQuery.exec((err, foundUser) => {
		if (err) res.status(400).json({ msg: err.message })
		else res.status(200).json(foundUser)
	})
})

// GET loads by username
router.get('/:username/loads', async (req, res) => {
	const loadQuery =  User.findOne({ username: req.params.username })
	loadQuery.exec((err, foundUser) => {
		if (err) res.status(400).json({ msg: err.message })
		else {
			//const loads = userloads.map(id => Load.findById(id))
			res.status(200).json(foundUser.loads)
		}
		
	})
})

// GET single load
router.get('/:username/loads/:loadid/', async (req, res) => {
	try {

		const loadQuery = Load.findById(req.params.loadid)
		loadQuery.exec((err, foundLoad) => {
			if (err) res.status(400).json({ msg: err.message })
			else res.status(200).json(foundLoad)
		})

	} catch (err) {
		res.status(200).json({ msg: err.message })
	}
})

// UPDATE A USER WITH A NEW LOAD
router.put('/:username/loads/add', async (req, res) => {
	try {
		const loadToAdd = await Load.create(req.body)
		const updatedUser = await User.findOneAndUpdate({username: req.params.username}, {
			$addToSet: { loads: loadToAdd }
		}, { new: true })
		if (updatedUser) res.status(200).json(updatedUser.loads)
		else res.status(400).json({ msg: "unable to create load" })
	} catch (err) {
		res.status(400).json({ msg: err.message })
	}
})

// UPDATE A USER REMOVED LOAD
router.put('/:username/loads/:loadid/delete', async (req, res) => {
	try {
		// necessary? test to see . . . 
		
		const filter = {username: req.params.username}
		
		const updatedUser = User.findOneAndUpdate(
			filter,
			{
				$pull: {
					loads: { _id : req.params.loadid}
				}
			},
			{new: true},
			(err, data) => {
				if (err) {
					return res.status(500).json({ error: 'error in deleting address'});
				}
				res.json(data)
			}
		);
		
	} catch (err) {
		res.status(200).json({ msg: err.message })
	}
})


module.exports = router;