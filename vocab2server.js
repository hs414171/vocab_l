const path = require('path')
require('dotenv').config({path: __dirname +'/.env'});
const express = require('express')
const mongoose = require('mongoose')
const user_routes = require('./routes/user_routes')

// const prod_routes = require('./routes/product_routes')

const cors = require('cors')
const port = process.env.PORT
const app = express()
console.log(__dirname)


// var options = {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.send("Hello World")
})


mongoose.connect(
    process.env.DATABASE_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on('error', (error)=>{console.log(error)});
db.once('open', ()=>{console.log('Connected to Database')});
app.use(express.json())
app.use('/api/user',user_routes)




app.listen(port,()=>{
    console.log(`Server listening to port ${port}`)
})