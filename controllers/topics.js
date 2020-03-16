const express = require('express');
const router = express.Router();
const Topic = require('../models/topics.js')
const User = require('../models/user.js')
const multer = require('multer');
const Chat = require('../models/chat.js')

////////////////////////////////////////////////////

////////////////////////////////////////////////////

//Routes

router.put('/:id', (req, res)=>{

    Topic.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, update) => {
      res.redirect('/topics/:id')
    })
    // Chat.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, update) => {
    //   res.redirect('/topics/:id')
    // })

});

//creates topic and puts it on the topics page
router.post('/', (req, res) => {

  Topic.create(req.body, (err, createdTopics) => {
      res.redirect('/topics');
  })

})



//once we do this the :id will not work anymore. This will find the _id in mongoose when we put findById

// router.post('/:id/new', (req , res) => {
//   User.findByIdAndUpdate({req.session.user._id})
//   Chat.create(req.body, (err, createdChat) => {
//     res.redirect('/topics/:id')
//   })
// })



// router.get('/:id', (req, res) => {
//   Topic.findById(req.params.id, (err, foundTopics) => {
//     res.render('topics/show.ejs', {
//       topics:foundTopics
//
//     })
//     console.log(topics);
//   })
// })

router.get('/', (req, res)=>{
  //this will test to see if the user matches to log in
  if (req.session.user) {
  //if user cookie doesn't exist the redirect to login
  // console.log(req.session.user);
  Topic.find({}, (error, allTopics) => {
    res.render('topics/index.ejs',
    {
      topics: allTopics,
      user: req.session.user
    });
  })
}else {
  res.redirect('/')
}
});



router.delete('/:id', (req, res) => {
  Topic.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/topics');
  })
})

//edits information
router.get('/:id/edit', (req, res)=>{
    Topic.findById(req.params.id, (err, foundTopics)=>{ //find the topics
        res.render(
    		'topics/edit.ejs',
    		{
    			topic: foundTopics //pass in found topics
    		}

    	);
    });
});

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

module.exports = router;
