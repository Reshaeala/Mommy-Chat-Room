const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const multer = require('multer');
const bcrypt = require('bcrypt')


// router.use(express.static('public'))
// router.get('/', (req,res) => {
//   res.send('working')
// })
router.get('/login', (req,res) => {
  res.render('session/login.ejs')
})


router.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (foundUser === null) {
      //this will redirect back to the session if user is not found.
      res.redirect('/session/login')
    }else{
      //because the password is encrypted we have to write to get the password another way.
      const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
      if (doesPasswordMatch) {
        //set cookie this will be also put in the fruits.js file
        req.session.user = foundUser
        res.redirect('/chatroom/profile');
      }else {
        res.redirect('/session/login')
      }
    }
  })
})


//
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/")
//   },
//   filename: (req, file, cb) => {
//
//     cb(null, `${file.originalname}-${Date.now()}`)
//   }
//   })
//
//   let multerStorage = multer({storage:storage});
//
//
//   router.post('/upload', multerStorage.array("image", 10), (req,res, ) => {
//     let fileinfo = req.file.filename;
//     let title = req.body.title;
//     console.log(title);
//     res.redirect('/session/profile')
//   } )





////////////////////////////////////////////////////////////////////////

module.exports = router;
