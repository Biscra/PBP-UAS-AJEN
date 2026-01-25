const stokinModel = require('../models/stokinModel')

const getAllStokin = async(req,res) =>{
    try{
        const kode = await categoryModel.getAllCategory()
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