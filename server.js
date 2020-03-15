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
///////////////////////////////////////////////////

const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3001;


app.get('/topics/:id', (req, res) => {
  res.render(__dirname + '/views/topics/show.ejs');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg)=> {
    io.emit('chat message', msg);
  });
});

///////////////////////////////////////////////////
app.use(session({
  secret:'feedmeseymour',
  resave: false,
  saveUninitialized:false
}))
app.use(express.static('public'));
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))

////////////////////////////////////////////////////////////////////

//this replaces all of the routes
const topicsController = require('./controllers/topics.js');
//So this will allow us to remove all the /topics so it can look cleaner in the topicsroutes.
app.use('/topics', topicsController);


////////////////////////////////////////////////////////////////////

                          //This is for the user page.
const userController = require('./controllers/user.js');
app.use('/user', userController)

app.get('/', (req, res) => {
  res.render('home.ejs')
})
////////////////////////////////////////////////////////////////////

const sessionController = require('./controllers/session.js');
app.use('/session', sessionController);

////////////////////////////////////////////////////////////////////
const chatController = require('./controllers/chat.js');
app.use('/chat', chatController)

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


http.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})
