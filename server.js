const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;
const multer = require('multer');
const methodOverride = require('method-override')
const session = require('express-session')



const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
app.use(session({
  secret:'feedmeseymour',
  resave: false,
  saveUninitialized:false
}))


app.use(express.static('public'));
app.use(methodOverride('_method'))

const sessionController = require('./controllers/session.js')
app.use('/session', sessionController)

const chatroomController = require('./controllers/chatroom.js');
app.use('/chatroom', chatroomController)

const userController = require('./controllers/user.js')
app.use('/user', userController)
app.get('/', (req, res) => {
  res.render('home.ejs')
})







// Connect to Mongo
mongoose.connect(process.env.DATABASE_URL, dbupdateobject);
// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected!')
);
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open', () => {
    console.log('Connection made!');
});


app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})
