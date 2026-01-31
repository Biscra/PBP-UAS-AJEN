const db = require('../config/db')

const getAllCategory = async () =>{
    const [rows] = await db.query("select * from kategori")
    return rows
}
const getCategoryByCode = async(code) =>{
    const [row] = await db.query("select * from kategori where nama_kategori=?",[code])
    return row[0]
}
const addCategory = async(kategori)=>{
    const {nama} = kategori
    const query = "insert into kategori" +"(nama)" + "values (?)"
    const affected = await db.query (query, [nama])
    return affected[0].affectedRows
}
const delCategory = async (id)=> {
    const aff = await db.query("Delete from kategori where nama", [id])
    return aff[0].affectedRows
}
const updateCategory = async (nama , kategori) =>{
    const {nama_kategori} = kategori
    const query = "Update kategori" + "SET nama = ?" + "WHERE nama = ?"
    const affected = await db.query(query, [nama_kategori, nama])
    return affected[0].affectedRows
}

module.exports = {getAllCategory,getCategoryByCode,addCategory,delCategory,updateCategory}
