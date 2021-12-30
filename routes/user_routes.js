require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const transportIt = require('../nodemailer')
router.get('/get-users', async (req,res)=>{
    try{
        const userData =  await User.find()
        res.json({userData})
    }catch(error){
        res.status(500)
    }
})

router.post('/login', async (req, res)=>{

    const user = await User.findOne({username : req.body.username})

    if(!user){
        res.status(404).send("no such user exists")
    }
    else if (!user.verified){
        res.status(205).send("user not verified")
    }
    else{
        const validPass = await bcrypt.compare(req.body.password,user.password)
        if(validPass){
            res.status(200).send("logged in")
        }else{
            res.status(403).send("wrong password")
        }
    }
    console.log(req.body.username,req.body.password)
    
    
    
    

});
    

    
    


router.post('/reg_user', async (req, res)=>{
    


    const username = req.body.username
    const users = await User.find()
    let state = 0

    
    for(var ind in users){
        if(username === users[ind].username){
            res.status(414).json({message: 'this username already exists'})
            state = 1
            break
        }
    }

    
    if(state === 0){
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            first_n: req.body.first_n,
            last_n: req.body.last_n,
            dob: req.body.dob,
            sat: req.body.sat,
            cat: req.body.cat,
            ielts: req.body.ielts,
            toefl: req.body.toefl,
            all_w: req.body.all_w
    })   
        try{
            const newUser = await user.save()
            res.status(201).json({message: 'new user created', user: newUser})
            
            const token2 = jwt.sign({_id:newUser._id},process.env.EMAIL_SECRET)
            console.log(token2)
            
            
            // const url = `https://dswproj.herokuapp.com/api/user/verification/${token2}`
            const url = `http://192.241.152.251:3000/api/user/verification/${token2}`
            const options = {
                from : process.env.EMAIL_ADDRESS,
                to : req.body.email,
                subject : "VERIFY YOUR ACCOUNT",
                html : `
                Click on the given link to verify your account: <a href = "${url}"> ${url}</a>
                `
            }
            transportIt.sendMail(options,function(error,info){
                if (error){
                    console.log(error)
                }
                else{
                    console.log("Email Sent"+info.response)
                }
            })
            
            
            
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }
    
});
router.get('/verification/:token2',async(req,res)=>{
    try {
        const user = jwt.verify(req.params.token2, process.env.EMAIL_SECRET)
        
        const query = {_id:user._id}
        const update_doc = {
            $set:{
                
                "verified": true
            }
        }
        const result = await User.findByIdAndUpdate(query,update_doc,{useFindAndModify : false , new:true})
        res.status(221).json({message:"Verified"})
        

        
      }catch (e) {
        res.send(e.message);
      }
})

router.post('/get_details',async(req,res)=>{
    const query = { username : req.body.username}
    const users = await User.findOne(query)
    res.status(201).json({
        "first_name":users.first_n,
        "last_name":users.last_n,
        "email":users.email,
        "cat":users.cat,
        "sat":users.sat,
        "toefl":users.toefl,
        "ielts":users.ielts
    })
})
module.exports = router;