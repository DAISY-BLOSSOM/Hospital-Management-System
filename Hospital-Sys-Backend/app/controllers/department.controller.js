const departmentModel = require("../db/models/medicine.model")
const {resGenerator} = require("../helpers/methods")
class Department{
    static addDepartment = async(req, res) =>{
        try{
            const departmentData = new departmentModel({...req.body, addedby:req.user._id})
            await departmentData.save()
            resGenerator(res,200,departmentData, "message")
        }
        catch(e) {
            resGenerator(res, 500, e.message, "invalid")
        }
    }

    static getAllDepartments = async(req, res) =>{
        try{
        const departments = await departmentModel.find().sort({name:1})
        resGenerator(res, 200, departments, "data fetched")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error in data")
        }
    } 
    static getSingle = async(req, res) =>{
        try{
            const departments = await departmentModel.findById(req.params.id)
            if(!departments) throw new Error("user not found")
            resGenerator(res, 200, departments, "data fetched")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error in data")
        }
    } 
    static edit = async(req, res)=>{
        try{
            const avlEdits = ["numName", "floor", "type", "desc"]
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
    static deldepartment = async(req, res) =>{
        try{
            const departmentData= await departmentData.findOneAndDelete({
                _id:req.params.id,
                addedby:req.user._id
            })
            if(!departmentData) throw new Error("invalid data")
            resGenerator(res,200,departmentData , "message")
        }
        catch (e){
            resGenerator(res,500,e.message,"invalid")
        }
    }
}
module.exports = Department