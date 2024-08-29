const express =require('express');
const app=express();
const userRoutes=require('./user/router')

app.use('/',userRoutes);
// app.use('/',userRoutes);


module.exports=app;