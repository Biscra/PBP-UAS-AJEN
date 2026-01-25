const medicineModel = require('../models/medicineModel')

const getAllMedicine = async(req,res) =>{
    try{
        const obat = await medicineModel.getAllMedicine()
        res.json(obat)
    }
    catch (error) {
        res.status(500).json(
            {
                message : "Error Get All obat",
                status : 500
            }
        )
    }
}
const getMedicineByCode = async(req,res)=>{
    try {
        const obat = await medicineModel.getMedicineByCode(teq.params.code)
        if(!obat){
            return res.status(404).json({
                message : 'Data Not Found'
            })
        }
        res.json(obat)
    }
    catch (error){
        res.status(500).json({message:error})
    }
}
const addMedicine = async(req,res)=>{
    const {nama, harga, kategori} = req.body
    let isNama = true
    let isHarga = true
    let isKategori = true
    let msg = ""
    if(!nama){
        msg = msg + "Nama Wajib Diisi"
        isNama = false
    }
    if(!harga){
        msg = msg + "Harga Wajib DIisi"
        isHarga = false
    }
    if(!kategori){
        msg = msg + "Kategori Wajib Diisi"
        isKategori = false
    }
    if(isNama && isHarga && isKategori){
        try {
            const affected = await medicineModel.addMedicine(req.body)
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
const delMedicine = async(req,res)=>{
    try{
        const result = await medicineModel.delMedicine(req.body)
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
const updateMedicine = async (req,res)=>{
    const nama = req.params.code
    const {harga, kategori} = req.body
    if(!harga || !kategori){
        return res.status(400).json({
            message: "Harga dan Kategori Wajib Diisi"
        })
    }
    try {
        const existing = await medicineModel.updateMedicine(nama)
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
module.exports = {getAllMedicine,getMedicineByCode,addMedicine,delMedicine,updateMedicine,getAllUser,getUserById}