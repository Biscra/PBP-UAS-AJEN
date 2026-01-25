const db = require('../config/db')

const getAllStokin = async () =>{
    const [rows] = await db.query("select * from stok_masuk")
    return rows
}
const addStokin = async(kode_sm)=>{
    const {kode_sm, quatity, tanggal_masuk} = stok_masuk
    const query = "insert into stok_masuk" +"(kode_sm, quatity, tanggal_masuk)" + "values (?,?,?)"
    const affected = await db.query (query, [kode_sm, quatity, tanggal_masuk])
    return affected[0].affectedRows
}

module.exports = {getAllStokin,addStokin}