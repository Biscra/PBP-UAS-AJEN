const db = require('../config/db')

const getAllStokout = async () =>{
    const [rows] = await db.query("select * from stok_keluar")
    return rows
}
const addStokout = async(stok_keluar)=>{
    const {kode_sk, quantity, tanggal_keluar} = stok_keluar
    const query = "insert into stok_keluar" + "(kode_sk, quantity, tanggal_keluar)" + "values (?,?,?)"
    const affected = await db.query (query, [kode_sk, quantity, tanggal_keluar])
    return affected[0].affectedRows
}
const delStokout = async(id)=>{
    const [result] = await db.query(
        "DELETE FROM stok_keluar WHERE id=?",
        [id]
    )
    return result.affectedRows
}

module.exports = {getAllStokout,addStokout,delStokout}
