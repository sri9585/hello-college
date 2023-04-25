const express = require('express')

const authprocess = require('./Controller/authprocess.js')

const mongoose  = require('mongoose')

const db = 'mongodb+srv://21cs111:21cs111@cluster0.who3hzq.mongodb.net/test';
mongoose.connect(db).then(
    ()=>{
        console.log("connected to the database")
    }
).catch((error)=>{
    console.log(error)
})
const Port  = process.env.Port || 5000;

const app = express();
app.use(express.json())
app.use(authprocess)




app.listen(Port, "0.0.0.0",()=>{
    console.log("connected to the Port: "+Port)
})