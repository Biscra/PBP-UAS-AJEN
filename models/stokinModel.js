const db = require('../config/db')

const getAllStokin = async () =>{
    const [rows] = await db.query("select * from stok_masuk")
    return rows
}
const addStokin = async(stok_masuk) =>{
    const {kode_sm, quantity, tanggal_masuk} = stok_masuk
    const query = "insert into stok_masuk" + "(kode_sm, quantity, tanggal_masuk)" + "values (?,?,?)"
    const affected = await db.query (query, [kode_sm, quantity, tanggal_masuk])
    return affected[0].affectedRows
}
const delStokin = async(id)=>{
    const [result] = await db.query(
        "DELETE FROM stok_masuk WHERE id=?",
        [id]
    )
    return result.affectedRows
}

module.exports = {getAllStokin,addStokin,delStokin}
