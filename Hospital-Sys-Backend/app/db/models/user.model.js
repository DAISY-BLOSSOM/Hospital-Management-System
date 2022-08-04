const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt= require("bcryptjs")

const otpGenerator = require('otp-generator')
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2, 
        maxlength:50
    }, 
    age:{
        type:Number,
        default:22,
        min:22,
        max:60
    }, 
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email format")
        }
    }, 
    //check status
    status:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true,
        trim:true
    }, 
    phone:{
        type:Number,
        required:true,
        trim:true,
        unique:true,
    },
    type:{
        type:String,
        required:true,
        trim:true,
        enum:["admin", "doctor", "labTechnician", "nurse", "pharmacist", "patient"],
        default:"patient",
        lowercase:true
    }, 
    qualification:{
        type:String,
        trim:true,
        required: function(){ 
            if(this.type=="doctor" || this.type=="nurse" || this.type=="pharmacist")
            return true
            else return false }
    },
    pImage:{
        type:String,
        trim:true
    }, 
    specializaion:{
        type:String,
        trim:true,
        required: function(){ return this.type=="doctor"},
        
    },
    // ///rev it!!!
    // prescription:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:function(){ return this.type=="doctor"},
    //     ref:"User"
    // },
    otp:{
        type:String,
        trim:true,
        minlength:6,
        maxlength:6,
        default: otpGenerator.generate(6, { 
            upperCaseAlphabets: false, 
            specialChars: false, 
            lowerCaseAlphabets:false 
        })
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

userSchema.methods.toJSON =  function(){
    const deleted = ["password", "__v", "tokens"]
    const data = this.toObject()
    deleted.forEach(d=> delete data[d])
    return data
}
userSchema.pre("save", async function(next){
    if(this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 12)
    next()
})
userSchema.statics.login = async(email, password)=>{
    const userData = await User.findOne({email})
    if(!userData) throw new Error("invalid email")
    const isMatched = await bcrypt.compare(password, userData.password)
    if(!isMatched) throw new Error("invalid password")
    return userData
}
userSchema.methods.generateToken = async function(){
    const user = this
    // if(user.tokens>3) 
    const token = jwt.sign({_id: user._id}, process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.sendOTP = async(email)=>{
    const userData = await User.findOne({email})
    if(!userData) throw new Error("invalid email")
    userData.otp = otpGenerator.generate(6, { 
        upperCaseAlphabets: false, 
        specialChars: false, 
        lowerCaseAlphabets:false 
    })
    await userData.save()
    return userData.otp
}
const User = mongoose.model("User", userSchema)
module.exports=User