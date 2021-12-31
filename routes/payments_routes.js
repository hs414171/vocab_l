require('dotenv').config()
const router = require('express').Router()
const axios = require('axios')
const User = require('../models/user')
const IdGen = require('randomstring')

router.post('/orders', async (req, res)=>{    
    // GETTING THE USERNAME FROM JSON BODY
    // AND GENERATING QUERY
    const query = {username: req.body.username}
    const user = await User.findOne(query)
    // GENERATING RECEIPT ID
    const rid = IdGen.generate({
        length: 10,
        charset: 'alphanumeric'
    })
    // CREATING DATA TO SEND THE REQUEST
    var data = JSON.stringify({
        receipt: rid,
        amount: 100,
        currency: "INR",
        notes: {
            "name": user.first_n + " " + user.last_n,
            "email": user.email
        }
    });
    // CONFIGURATIONS FOR THE REQUEST 
    const config = {
    method: 'post',
    url: 'https://api.razorpay.com/v1/orders',
    headers: { 
        'Authorization': 'Basic cnpwX2xpdmVfTGFTZTl3ZGxQMnlCbng6WURKN2Y2TFNSbXhFR3JMeFB3bnhKYmlH', 
        'Content-Type': 'application/json'
    },
    data : data
    };
    // CREATING AN ORDER (WILL BE REFLECTED IN RAZORPAY) 
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        // SENDING THE RESPONSE OF THE GENERATED ORDER
        res.json(response.data)
    })
    .catch(function (error) {
        console.log(error);
        // SENDING THE RESPONSE OF ERROR
        res.json(error)
    });
})

module.exports = router