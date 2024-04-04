const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const userController = require('../controllers/userController');


router.get('/profile', profileController.profile)


router.get('/signup',userController.signup)
router.get('/signin',userController.signin)

module.exports = router