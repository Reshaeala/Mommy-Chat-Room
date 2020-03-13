const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const bcrypt = require('bcrypt')


router.get('/new', (req, res) => {
  res.render('user/new.ejs')
})

router.post('/', (req, res) => {

  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    res.redirect('/chatroom/profile/')
  })

})


module.exports = router;
