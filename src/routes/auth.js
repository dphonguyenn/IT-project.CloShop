const express = require('express');
const router = express.Router();
const authUtil = require('../util/auth');
const passport = require('passport');
const AuthController = require('../app/controllers/AuthController');
router.post('/login', passport.authenticate('local', {
    failureRedirect:'back',
    failureFlash:'Wrong username or password'
}), AuthController.login);
router.post('/logout', AuthController.logout);
module.exports = router;