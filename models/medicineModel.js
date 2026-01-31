const db = require('../config/db')

const getAllMedicine = async ()=>{
    const [rows] = await db.query("SELECT * FROM obat")
    return rows
}
const getMedicineById = async(id)=>{
    const [row] = await db.query(
        "SELECT * FROM obat WHERE id_obat = ?",
        [id]
    )
    return row[0]
}
const addMedicine = async(data)=>{
    const {nama_obat, kategori, harga} = data
    const query = `
        INSERT INTO obat (nama_obat, kategori, harga)
        VALUES (?,?,?)
    `
    const [result] = await db.query(query,[nama_obat,kategori,harga])
    return result.affectedRows
}
const updateMedicine = async(id,data)=>{
    const {nama_obat, harga} = data
    const query = `
        UPDATE obat SET nama_obat=?, harga=?
        WHERE id_obat=?
    `
    const [result] = await db.query(query,[nama_obat,harga,id])
    return result.affectedRows
}
const delMedicine = async(id)=>{
    const [result] = await db.query(
        "DELETE FROM obat WHERE id_obat=?",
        [id]
    )
    return result.affectedRows
}
module.exports = {getAllMedicine,getMedicineById,addMedicine,updateMedicine,delMedicine}
