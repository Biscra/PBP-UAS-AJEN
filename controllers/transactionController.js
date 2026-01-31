const db = require('../models/transactionModel')

const getAllTransaction = async(req,res) =>{
    try {
        const transaksi = await trasactionModel.getAllTransaction()
        res.json(transaksi)
    }
    catch (error) {
        res.status(500).json(
            {
                message : "Error Get All Transaction",
                status : 500
            }
        )
    }
}
const addTransaction = async(req,res) =>{
    const {id_obat, id_sk, harga, waktu} = transaksi
    let isId_obat = true
    let isId_sk = true
    let isHarga = true
    let isWaktu = true
    let msg = ""
    if(!id_obat){
        msg = msg + "Id Harus Diisi"
        isId_obat = false
    }
    if(!id_sk){
        msg = msg + "Id harus diisi"
        isId_sk = false
    }
    if(!harga){
        msg = msg + "Harga Wajib Diisi"
        isHarga = false
    }
    if(!waktu){
        msg = msg + "Waktu transaksi wajib diisi."
        isWaktu = false
    }
    if(isId_obat && isId_sk && isHarga && isWaktu){
        try {
            const affected = await trasactionModel.addTransaction(req.body)
            if(affected == 1)[
                res.status(200).json({
                    msg : "Insert Succesfull",
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
module.exports = {getAllTransaction,addTransaction}
