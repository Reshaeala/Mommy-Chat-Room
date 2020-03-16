const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

//This will go to the user ejs file in views
router.get('/new', (req,res) => {
  res.render('user/new.ejs')
})

router.post('/', (req, res) => {
  //this will jumbel the password
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  //this created a user.
  User.create(req.body , (err, createUser) => {
    //this is the user
    req.session.user = createUser
    //this redirects the user.
    res.redirect('/topics')

  })
})

router.put('/:id', (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, update) => {
      res.redirect('/user/:id')
    })
});

router.get('/:id', (req, res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        res.render(
    		'user/profile.ejs',
    		{
    			user: foundUser
    		}

    	);
    });
});



module.exports = router;
