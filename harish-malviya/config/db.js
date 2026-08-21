const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://harishmalviya511_db_user:<db:password>@cluster0.dxfzto2.mongodb.net/?appName=Cluster0");

const db = mongoose.connection;



db.on("connected" , ()=>{
    console.log("Mongoosedb connected successfully")
});


db.on("disconnected" ,()=>{
    console.log("Mongoosedb disconnected")
});

db.on("error" , (error)=>{

    console.log("error", error);
});

module.exports = db;
