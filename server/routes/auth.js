const express = require('express');
const { signin, signup, googleAuth } = require('../controller/auth');

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/google-auth', googleAuth);

module.exports = router;