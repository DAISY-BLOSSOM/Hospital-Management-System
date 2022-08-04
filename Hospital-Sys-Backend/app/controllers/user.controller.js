const userModel = require("../db/models/user.model")
const {resGenerator} = require("../helpers/methods")
class User{
    static register = async(req, res)=>{
        try{
            const data = new userModel(req.body)
            await data.save()
            resGenerator(res, 200, data, "registered")
        }
        catch(e){
            resGenerator(res, 500, e.message, "cann't register")
        }
    } 
    static login = async(req, res)=>{
        try{
            const userData = await userModel.login(req.body.email, req.body.password)
            if(!userData.status) return resGenerator(res, 500, {otp: userData.otp}, "activate first")
            const token = await userData.generateToken()
            resGenerator(res, 200, {user:userData, token}, "registered")
        }
        catch(e){
            resGenerator(res, 500, e.message, "cann't login")
        }
    }
    static activate = async(req, res)=>{
        try{
            const userData = await userModel.login(req.body.email, req.body.password)
            if(userData.status) throw new Error("already active")
            if(userData.otp!=req.body.otp) throw new Error("invalid otp")
            userData.status=true
            userData.otp=null
            await userData.save()
            resGenerator(res, 200, userData, "ACTIVATED")
        }
        catch(e){
            resGenerator(res, 500, e.message, "cann't activate user")
        }
    } 
    static me = async(req,res)=>resGenerator(res, 200, req.user, "data featched")
    static sendOtp = async(req,res)=>{
        try{        
            const otp = await userModel.sendOtp(req.body.email)
            resGenerator(res,200, otp, "otp generated")
        }
        catch(e){
            resGenerator(res,500, e.message, "otp  cann't generated")

        }
    }
    static changePassword = async(req, res)=>{
        try{
            //email, new pass, otp
            const userData= await userModel.findOne({
                email:req.body.email, 
                otp:req.body.otp
            })
            if(!userData) throw new Error("invalid")
            userData.password= req.body.newPass
            await userData.save()
            resGenerator(res, 200, userData, "updated")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error on update")

        }
    }
    static logout = async(req, res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(t=> t.token!=req.token)
            await req.user.save()
            resGenerator(res, 200, userData, "updated")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error")

        }
    } 
    static logoutAll = async(req, res)=>{
        try{
            req.user.tokens = []
            await req.user.save()
            resGenerator(res, 200, userData, "updated")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error")
        }
    } 
    static allUsers = async(req, res)=>{
        try{
            const users = await userModel.find().sort({name:1})
            resGenerator(res, 200, users, "data fetched")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error in data")
        }
    } 
    static singleDetails = async(req, res)=>{
        try{
            const users = await userModel.findById(req.params.id)
            if(!users) throw new Error("user not found")
            resGenerator(res, 200, users, "data fetched")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error in data")
        }

    } 
    static editPassword = async(req, res)=>{
        try{
            req.user.password= req.body.newPass
            await req.user.save()
            resGenerator(res, 200, req.user, "updated")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error on update")

        }
    } 
    static deactivate = async(req, res)=>{
        try{
            req.user.status= false
            req.user.tokens = []
            await req.user.save()
            resGenerator(res, 200, req.user, "updated")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error on update")
        }
    } 
    static delAccount = async(req, res)=>{
        try{
            await req.user.remove()
            resGenerator(res, 200, req.user, "updated")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error on update")

        }
    } 
    static edit = async(req, res)=>{
        try{
            const avlEdits = ["name", "age"]
            const bodyKeys = Object.keys(req.body)
            const matched = bodyKeys.every(key=> avlEdits.includes(key))
            if(!matched) throw new Error("invalid updates")
            bodyKeys.forEach(k=> req.user[k]=req.body[k])
            await req.user.save()
            resGenerator(res, 200, req.user, "updated")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error on update")

        }
    } 
    static changeImage = async(req, res)=>{
        try{
            req.user.pImage= req.file.filename
            await req.user.save()
            resGenerator(res, 200, req.user, "message")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error")
        }
    }
}
module.exports=User