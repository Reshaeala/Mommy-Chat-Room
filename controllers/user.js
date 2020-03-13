const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const bcyrpt = require('bcrypt');

router.get('/new', (req, res) => {
  res.render('user/new.ejs')
})

// router.post('/', (req, res) => {
//   res.redirect()
// })

module.exports = router;
