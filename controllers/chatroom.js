const express = require('express');
const router = express.Router();
const Chat = require('../models/chat.js')


router.get('/new' , (req, res) => {
  res.render('chat/new.ejs')
})

router.get('/profile', (req, res) => {
  res.render('chat/profile.ejs')
})

module.exports = router;
