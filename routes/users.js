const express = require('express');
const router = express.Router();
const passport = require('passport');

const profileController = require('../controllers/profileController');
const userController = require('../controllers/userController');


router.get('/profile',passport.checkAuthentication,profileController.profile)


router.get('/signup',userController.signup)
router.get('/signin',userController.signin)


router.post('/create',userController.create)

// use passport as middleware to authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {
        failureRedirect: '/users/signin',
        successRedirect: '/users/profile',
    },
),userController.createSession)


// Signout route
router.get('/session-signout',userController.signout)

module.exports = router