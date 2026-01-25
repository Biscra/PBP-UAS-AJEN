const db = require('../config/db')
const dataUser = ['icikiwir'];

const getAllMedicine = async () =>{
    const [rows] = await db.query("select * from obat")
    return rows
}
const getMedicineByCode = async(code) =>{
    const [row] = await db.query("select * from obat where nama_obat=?",[code])
    return row[0]
}
const addMedicine = async(obat)=>{
    const {nama, harga, kategori} = obat
    const query = "insert into obat" +"(nama, harga, kategori)" + "values (?,?,?)"
    const affected = await db.query (query, [nama, harga, kategori])
    return affected[0].affectedRows
}
const delMedicine = async (id)=> {
    const aff = await db.query("Delete from obat where nama", [id])
    return aff[0].affectedRows
}
const updateMedicine = async (nama , obat) =>{
    const {nama, harga, kategori} = obat
    const query = "Update obat" + "SET harga = ?, kategori = ?" + "WHERE nama_obat = ?"
    const affected = await db.query(query, [harga, kategori, nama])
    return affected[0].affectedRows
}

const getAllUser = ()=>{
    return dataUser
}

const getUserById = (id)=>{
    const result = []
    if(id <= dataUser.length){
        result.push(dataUser[id-1])
        return dataUser[id-1]
    }
    
    return []
}

module.exports = {getAllMedicine,getMedicineByCode,addMedicine,delMedicine,updateMedicine,getAllUser,getUserById}