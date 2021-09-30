const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate.js');

require('../db/conn.js');
const User = require('../model/userSchema.js');

// router.get('/', (req,res) => {
//     res.send("hello aliens from server")  
// });


// registration route
router.post('/register', async(req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if ( !name || !email || !phone || !work || !password || !cpassword ){
        res.status(422).json({error:"plz fill the field correctly"});
    }

    try {

        const userexist = await User.findOne({email: email});
        if(userexist){
            return res.status(422).json({error:"email already exists"});
        }
        else if (password != cpassword){
            return res.status(422).json({error:"password not matching"});
        }

        const user = new User({name, email, phone, work, password, cpassword});

        const resposnse = await user.save();

        if(resposnse){
            res.status(201).json({message:"user registered succesfully"});
        }
        else{
            res.status(500).json({error:"user registration unsuccesfull"});
        }
        
    } catch (error) {
        console.log(error);
    }
})

// login router
router.post('/login', async(req,res) => {
    // console.log(req.body);
    try {
        
        let token;

        const {email,password} = req.body;
        if( !email || !password ) {
            res.status(400).json({error:"plz fill the field correctly"});
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){

            const ismatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(ismatch){
                res.json({message:"user login successfull"});
            }
            else{
                res.status(500).json({error:"invalid credentials"});
            }
        }
        else{
            res.status(400).json({error:"user do not exist"});
        }

    } catch (error) {
        console.log(error);
    }
});

// about us page
router.get('/about', authenticate , (req,res) => {
    // console.log("hello about");
    res.send(req.rootUser);
  });

router.get('/getdata',authenticate,(req,res) => {
    res.send(req.rootUser);
})

// contact us page
router.post('/contact',authenticate,async (req,res) => {
    try {

        const { name, email, phone, message } = req.body;

        if(!name || !email || !phone || !message){
            console.log("error in contact form");
            return res.json({ error:"please fill the contact form correctly" });
        }

        const userContact = await  User.findOne({_id:req.userID});

        if(userContact){

            const userMessage = await userContact.addMessage(name,email, phone, message);

            await userContact.save();

            res.status(201).json({message:"user contact successfully"});

        }
        
    } catch (error) {
        console.log(error);
    }
});

// logout page
router.get('/logout', (req,res) => {
    console.log("hello my logout");
    res.clearCookie('jwtoken',{  path : '/' });
    res.status(200).send("user logout");
});

module.exports = router;