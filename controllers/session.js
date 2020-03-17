const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const Chat = require('../models/chat.js')
const bcrypt = require('bcrypt')


router.get('/login', (req, res) => {
  res.render('session/login.ejs')
})

router.post('/', (req, res) => {
  //This will find the ONE username based on the user that we typed in.
  User.findOne({username:req.body.username}, (err, foundUser) => {
    if (foundUser === null) {
      //this will redirect back to the session if user is not found.
      res.redirect('/session/new')
    }else{
  //because the password is encrypted we have to write to get the password another way.
    const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
    if (doesPasswordMatch) {
      //set cookie this will be also put in the topics.js file
      req.session.user = foundUser
      res.redirect('/topics');
    } else {
      res.redirect('/session/login')
    }
    }

  })

})
module.exports = router;
