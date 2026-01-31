const stokinModel = require('../models/stokinModel')

const getAllStokin = async(req,res) =>{
    try{
        const kode = await stokinModel.getAllStokin()
        res.json()
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
const addStokin = async(req,res)=>{
    const {kode, quantity, tanggal_masuk} = req.body
    let iskode = true
    let isQuantity = true
    let isTanggal = true
    let msg = ""
    if(!kode){
        msg = msg + "Kode Wajib Diisi"
        iskode = false
    }
    if(!quantity){
        msg = msg + "Quantity wajib di isi"
        isQuantity = false
    }
    if(!tanggal_masuk){
        msg = msg + "Tanggal wajib diisi"
        isTanggal = false
    }
    if(!iskode && isQuantity && isTanggal){
        try {
            const affected = await stokinModel.addStokin(req.body)
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
module.exports = {getAllStokin, addStokin}
