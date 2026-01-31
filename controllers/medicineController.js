const medicineModel = require('../models/medicineModel')
const openFdaModel = require('../models/openFdaModel')

const getAllMedicine = async(req,res) =>{
    try{
        const obat = await medicineModel.getAllMedicine()
        res.status(200).json(obat)
    }
    catch (error) {
        console.log(error);
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
        const obat = await medicineModel.getMedicineByCode(req.params.code)
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
const getMedicineFromOpenFda = async (req, res) => {
    try {
        const obat = await openFdaModel.getOpenFdaDrugs()
        res.status(200).json(obat)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error Get Data from openFDA",
            status: 500
        })
    }
}
const getMergeMedicine = async (req, res) => {
    try {
        const fdaData = await openFdaModel.getOpenFdaDrugs()
        const localData = await medicineModel.getAllMedicine()

        const result = fdaData.map(item => {
            const genericName = item.openfda?.generic_name?.[0]

            const local = localData.find(
                o => o.nama?.toLowerCase() === genericName?.toLowerCase()
            )

            return {
                brand_name: item.openfda?.brand_name?.[0] || '-',
                generic_name: genericName || '-',
                manufacturer: item.openfda?.manufacturer_name?.[0] || '-',
                harga: local ? local.harga : null,
                kategori: local ? local.kategori : null
            }
        })

        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error Merge Data",
            status: 500
        })
    }
}
const addMedicine = async(req,res)=>{
    const {nama_obat, harga, id_kategori} = req.body
    let isNama_obat = true
    let isHarga = true
    let isId_kategori = true
    let msg = ""
    if(!nama_obat){
        msg = msg + "Nama Wajib Diisi"
        isNama_obat = false
    }
    if(!harga){
        msg = msg + "Harga Wajib DIisi"
        isHarga = false
    }
    if(!id_kategori){
        msg = msg + "Kategori Wajib Diisi"
        isId_kategori = false
    }
    if(isNama_obat && isHarga && isId_kategori){
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
    const nama_obat = req.params.code
    const {harga, kategori} = req.body
    if(!harga || !kategori){
        return res.status(400).json({
            message: "Harga dan Kategori Wajib Diisi"
        })
    }
    try {
        const existing = await medicineModel.updateMedicine(nama_obat)
        if(!existing){
            return res.status(400).json({
                message: "Data Not Found"
            })
        }
        const affected = await medicineModel.updateMedicine(nama_obat , req.body)
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

module.exports = {getAllMedicine,getMedicineByCode,getMedicineFromOpenFda,getMergeMedicine,addMedicine,delMedicine,updateMedicine}
