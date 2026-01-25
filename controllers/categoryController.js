const categoryModel = require('../models/categoryModel')

const getAllCategory = async(req,res) =>{
    try{
        const kategori = await categoryModel.getAllCategory()
        res.json(kategori)
    }
    catch (error) {
        res.status(500).json(
            {
                message : "Error Get All Category",
                status : 500
            }
        )
    }
}
const getCategoryByCode = async(req,res)=>{
    try {
        const kategori = await categoryModel.getAllCategory(teq.params.code)
        if(!kategori){
            return res.status(404).json({
                message : 'Data Not Found'
            })
        }
        res.json(kategori)
    }
    catch (error){
        res.status(500).json({message:error})
    }
}
const addCategory = async(req,res)=>{
    const {nama} = req.body
    let isNama = true
    let msg = ""
    if(!nama){
        msg = msg + "Nama Wajib Diisi"
        isNama = false
    }
    if(isNama){
        try {
            const affected = await categoryModel.addCategory(req.body)
            if(affected == 1)[
                res.status(200).json({
                    msg : "insert successfull",
                    data : {...req.body}
                })
            ]
        }
        catch (error){
            res.status(400).json({
                message : error
            })
        }
    }
    else{
        res.status(400).json({msg:msg})
    }
}
const delCategory = async(req,res)=>{
    try{
        const result = await categoryModel.delCategory(req.body)
        if(result == 1){
            res.status(200).json({msg:"Delete is Successfull"})
        }
        else{
            res.status(400).json({msg:error})
        }
    }
    catch(error){
        res.status(400).json({msg:error})
    }
}
const updateCategory = async (req,res)=>{
    const nama = req.params.code
    if(!nama){
        return res.status(400).json({
            message: "Kategori Wajib Diisi"
        })
    }
    try {
        const existing = await categoryModel.updateCategory(nama)
        if(!existing){
            return res.status(400).json({
                message: "Data Not Found"
            })
        }
        const affected = await medicineModel.updateMedicine(nama , req.body)
        if (affected === 1){
            res.status(200).json({
                msg: "Update Failed"
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Error while updating",
            error: error
        })
    }
}
const getAllUser = async(req,res)=>{
    try{
        const user = await userModel.getAllUser()
        if(users.length > 1){
            res.status(200).json({
                result : user,
                msg : "Success get All Data"
            })
        }
        else{
            res.status(200).json({
                result : users,
                msg : "Data Not Found"
            })
        }
    }
    catch(error){
        res.status(500).json({
            msg : error
        })
    }
}
const getUserById = async (req,res)=>{
    try {
        console.log(req.params.id);
        
        const user = await userModel.getUserById(req.params.id)
        
        if(user){
            res.status(200).json({
                data : user,
                msg : "User Found"
            })
        }
        else{
            res.status(200).json({
                msg : "User Not Found"
            })
        }
    }
    catch (error){
        res.status(500).json({
            msg : error
        })
    }
}
module.exports = {getAllCategory,getCategoryByCode,addCategory,delCategory,updateCategory,getAllUser,getUserById}