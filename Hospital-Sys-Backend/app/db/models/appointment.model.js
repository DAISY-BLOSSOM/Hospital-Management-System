const mongoose = require("mongoose")
const appointmentSchema= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    Date:{
        type:Date,
        required:true,
    },
    signSymptoms:{
        type:String,
        trim:true,
        lowecase:true,
        required:true
    },
    addedby:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }, 
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {
    timestamps:true
})

const Appointment = new mongoose.model("Appointment", appointmentSchema)
module.exports=Appointment