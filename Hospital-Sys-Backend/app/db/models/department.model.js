const mongoose = require("mongoose");
const departmentSchema = mongoose.Schema({
    numName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }, 
    floor:{
        type:String,
        required:true,
        trim:true,
    },
    type:{
        type:String,
        required:true,
        trim:true
    },
    desc:{
        type:String,
        trim:true,
    }
})
const Department = mongoose.model("Department", departmentSchema)
module.exports=Department