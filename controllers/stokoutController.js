const stokoutModel = require('../models/stokoutModel')

const getAllStokout = async(req,res) =>{
    try{
        const kode = await stokoutModel.getAllStokout()
        res.json(stok_keluar)
    }
    catch (error) {
        res.status(500).json(
            {
                message : "Error Get All Stok Out",
                status : 500
            }
        )
    }
}
const addStokout = async(req,res)=>{
    const {kode_sk, quantyti, tanggal_keluar} = req.body
    let isKode_sk = true
    let isQuantyti = true
    let isTanggal_keluar = true
    let msg = ""
    if(!kode_sk){
        msg = msg + "Kode Wajib Diisi"
        isKode_sk = false
    }
    if(!quantyti){
        msg = msg + "Quantyti Wajib Diisi"
        isQuantyti = false
    }
    if(!tanggal_keluar){
        msg = msg + "Tanggal Wajib Diisi"
        isTanggal_keluar = false
    }
    if(isKode_sk && isQuantyti && isTanggal_keluar){
        try {
            const affected = await stokoutModel.addStokout(req.body)
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
module.exports = {getAllStokout,addStokout}
