const express=require('express');
const cookieParser = require('cookie-parser')

const connect=require('./config/connectDb');
const router=require('./route');

const app=express();

connect();

const PORT=8080;

app.use(cookieParser())
app.use(express.json());
app.use('/api',router);

app.listen(PORT,()=>{
    console.log(`Successfully connected at port ${PORT}`)
});