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

router.post('/gw',async(req,res,)=>{
    const words = await Word.find()
    var arr = [];
    const user = req.body.username
    const tests = []
    const test = ["sat","toefl","ielts","cat"]
    for (var i of test){
        if(user.i === true){
            tests.push(i)
        }
    }
    const length = tests.length
    for (var word of words){
        if (length===1){
            if (words.tests[0]===true){
                arr.push(word)
            }
        }
        if (length===2){
            if (words.tests[0] || words.tests[1]===true){
                arr.push(word)
            }
        }
        if (length===3){
            if (words.tests[0] || words.tests[1] || words.tests[2]===true){
                arr.push(word)
            }
        }
        if (length===1){
            if (words.tests[0] || words.tests[1] || words.tests[2] || words.tests[3]===true){
                arr.push(word)
            }
        }
    }
    res.json({"words":arr})
})

module.exports = router

