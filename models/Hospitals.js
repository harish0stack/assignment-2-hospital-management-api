const mongoose = require("mongoose");

const HospitalsSchema = {

    name :{
        type:String,
        required:true
    },
    city :{
        type:String,
        required:true
    }
    ,totalBeds :{
        type:Number,
        required:true
    },
    availableBeds :{
        type:Number,
        required:true
    }

};

const Hospitals = mongoose.model('Hospitals' ,HospitalsSchema );

module.exports =  Hospitals ;