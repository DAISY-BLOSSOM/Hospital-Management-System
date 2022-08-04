const mongoose = require("mongoose");
const medicineSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }, 
    productionDate:{
        type:Date,
        required:true,
        trim:true,
    }, 
    expDate:{
        type:Date,
        required:true,
        trim:true,
    }, 
    price:{
        type:String,
        trim:true,
        required:true,
    },
    quantity:{
        type:Number,
        trim:true,
    },
    addedby:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
})
const Medicine = mongoose.model("Medicine", medicineSchema)
module.exports = Medicine