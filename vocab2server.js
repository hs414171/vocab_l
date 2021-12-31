const path = require('path')
require('dotenv').config({path: __dirname +'/.env'})
const express = require('express')
const mongoose = require('mongoose')
const user_routes = require('./routes/user_routes')
const word_routes = require("./routes/word_routes")
const payment_routes = require("./routes/payments_routes")
const cors = require('cors')
const port = process.env.PORT
const app = express()
console.log(__dirname)


app.use(cors())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// ESTABLISHING CONNECTION TO THE DATABASE

mongoose.connect(
    process.env.DATABASE_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// CHECKING CONNECTION

const db = mongoose.connection;
db.on('error', (error)=>{console.log(error)});
db.once('open', ()=>{console.log('Connected to Database')})

// MIDDLEWARE 

app.use(express.json())
app.use('/api/user',user_routes)
app.use('/api/words',word_routes)
app.use('/api/payment', payment_routes)

// GENERIC ROUTE
app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(port,()=>{
    console.log(`Server listening to port ${port}`)
})