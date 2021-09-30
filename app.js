const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config({path:'./config.env'});


// const User = require('./model/userSchema.js');

app.use(cors());
app.use(express.json());
app.use(cookieparser())
app.use(require('./router/auth.js'));

const PORT = process.env.PORT || 5000;

// app.get('/', (req,res) => {
//   res.send("hello aliens from server")  
// });
// app.get('/about', (req,res) => {
//   res.send("hello aliens from server about")  
// });
// app.get('/contact', (req,res) => {
//   res.cookie('test','aliens');
//   res.send("hello aliens from server contact")  
// });
app.get('/login', (req,res) => {
  res.send("hello aliens from server login")  
});
app.get('/signup', (req,res) => {
  res.send("hello aliens from server signup")  
});


// heroku config
if(process.env.NODE_ENV == 'production'){
  app.use(express.static("client/build"));
}


app.listen(PORT, () => {
    console.log(`The server is losting at port ${PORT}`);
});