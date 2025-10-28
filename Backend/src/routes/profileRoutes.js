const express = require('express');
const router = express.Router();
const {createProfile,getMyProfile,updateMyProfile,hasCompletedProfile} = require('../controllers/profilecontoller');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/createProfile',authMiddleware.authenticateUser, createProfile);
router.get('/getProfile',authMiddleware.authenticateUser, getMyProfile);
router.put('/updateProfile',authMiddleware.authenticateUser, updateMyProfile);
router.get('/hasCompletedProfile',authMiddleware.authenticateUser, hasCompletedProfile);
 
module.exports = router;