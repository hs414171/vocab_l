require('dotenv').config()
const express = require('express')
const router = express.Router()
const Word = require('../models/words')
const User = require('../models/words')
const Question = require('../models/question')

// ROUTE TO GET ALL WORDS
router.get('/getAllWords', async (req, res)=>{
    const words = await Word.find()
    res.status(200).json({words: words})
})

// ROUTE TO GENERATE DATA TO BE USED FOR EVALUATION
router.get('/getSomeWords', async(req, res)=>{
    const words = await Word.find()
    const numWords = req.body.numWords

    // creating maps of words in order to send
    const totalWords = words.length
    var quesList = []
    while(quesList.length < numWords){
        var optionList = []
        while(optionList.length < 3){
            const index = Math.floor(Math.random()*totalWords)
            const word = words[index]
            if(optionList.find(element => element === word) === undefined){
                optionList.push(word)
            }
        }

        // again pick a random word from wordlist
        const options = optionList.map((i)=>i['word'])
        const index = Math.floor(Math.random()*3)
        const question = optionList[index]['meaning']
        const answer = optionList[index]['word']

        const quesObject = new Question(
            question,
            answer,
            options
        )

        if(quesList.find(element => element['question'] === quesObject['question']) === undefined){
            quesList.push(quesObject)
        }
    }

    console.log(quesList)
    res.json({'questionData': quesList})
})

// ROUTE TO SEND SPECIFIC WORDS
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

