require('dotenv').config()
const express = require('express')
const router = express.Router()
const Word = require('../models/words')
const User = require('../models/words')


router.get('/get-words', async (req,res)=>{
    try{
        const wordData =  await Word.find()
        res.json({wordData})
    }catch(error){
        res.status(500)
    }
})

router.patch('/freeWordFetch', async (req, res)=>{
    const wordData = await Word.findOne({word: req.body.word})
    const user = await User.findOne({username: req.body.username})

    const freeCounter = user.free_w 

    if(freeCounter >0){
        
        const updateDoc = {freeCounter: freeCounter - 1}
        const updatedUser = await User.findOneAndUpdate(
            {username: req.body.username},
            updateDoc,
            {
                new: true,
                useFindAndModify: false
            }
        )
        console.log("sending unrestricted data")
        console.log(updatedUser)
        res.json({images: wordData.images, video: wordData.video, restricted: false})
    }else{
        console.log("sending restricted data")
        res.json({restricted: true})
    }
})



