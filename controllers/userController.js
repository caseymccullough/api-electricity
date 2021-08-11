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
router.get('/:username', auth, (req, res) => {
	const userQuery = User.findOne({ username: req.params.username }).select('-password').populate('folders').populate('friends', 'firstName lastName').populate('friendRequestsSent', 'firstName lastName').populate('friendRequestsReceived', 'firstName lastName')
	userQuery.exec((err, foundUser) => {
		if (err) res.status(400).json({ msg: err.message })
		else res.status(200).json(foundUser)
	})
})

// // GET all loads for user
// router.get('/:user_id/loads', auth, (req, res) => {
// 	const loadQuery = Snippet.find({ owner: req.params.user_id })
// 	snippetQuery.exec((err, foundSnippets) => {
// 		if (err) res.status(400).json({ msg: err.message })
// 		else res.status(200).json(foundSnippets)
// 	})
// })

// router.get('/username/:userName', async (req, res) => {
//    try{
//       password = req.body.password;
//       const user = await User.findOne ({userName: req.params.userName});
//       res.json(user);
//    } catch (err) {
//       res.json( {message: err});
//    }
// });

// CREATE ROUTES ////////////////////////////////////////////

// Add a folder to a user
// router.post('/:username/addfolder', auth, async (req, res) => {
// 	try {
// 		const newFolder = await Folder.create(req.body)
// 		const updatedUser = await User.findByIdAndUpdate(newFolder.owner, {
// 			$addToSet: { folders: newFolder._id }
// 		}, { new: true })
// 		if (updatedUser) res.status(200).json(newFolder)
// 		else res.status(400).json({ msg: "unable to create folder" })
// 	} catch (err) {
// 		res.status(400).json({ msg: err.message })
// 	}
// })


// UPDATE A USER WITH A NEW LOAD
router.post('/:id/addload', auth, async (req, res) => {
	try {
		const newLoad = await Load.create(req.body)
		const updatedUser = await User.findByIdAndUpdate(req.params.id, {
			$addToSet: { loads: newLoad._id }
		}, { new: true })
		if (updatedUser) res.status(200).json(newLoad)
		else res.status(400).json({ msg: "unable to create load" })
	} catch (err) {
		res.status(400).json({ msg: err.message })
	}
})

module.exports = router;