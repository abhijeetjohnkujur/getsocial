const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const userController = require('../controllers/userController');


router.get('/profile', profileController.profile)


router.get('/signup',userController.signup)
router.get('/signin',userController.signin)


router.post('/create',userController.create)
router.post('/createSession',userController.createSession)
router.get('/signout',userController.signout)

module.exports = router