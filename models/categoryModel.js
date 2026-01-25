const db = require('../config/db')
const dataUser = ['icikiwir'];

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
    const {nama} = kategori
    const query = "Update kategori" + "SET kategori = ?" + "WHERE nama_kategori = ?"
    const affected = await db.query(query, [nama])
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

module.exports = {getAllCategory,getCategoryByCode,addCategory,delCategory,updateCategory,getAllUser,getUserById}