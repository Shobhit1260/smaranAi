const express = require('express');
const router = express.Router();
const {signUp, signIn, signOut, resetPassword, updatePassword, signInWithGoogle, handleOAuthCallback} = require('../controllers/authcontroller');
const { authenticateUser } = require('../middlewares/authMiddleware');


// Public routes
router.post('/signup',signUp);
router.post('/signin',signIn);
router.get('/signout',signOut);
router.get('/signin/google', signInWithGoogle); 
// router.post('/callback', handleOAuthCallback); // Add Google OAuth callback route
router.post('/reset-password',resetPassword)
router.post('/update-password',authenticateUser,updatePassword)


module.exports = router;