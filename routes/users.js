const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const userController = require('../controllers/userController');


router.get('/profile', profileController.profile)


router.get('/signup',userController.signup)

module.exports = router