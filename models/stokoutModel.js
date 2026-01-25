const db = require('../config/db')

const getAllStokout = async () =>{
    const [rows] = await db.query("select * from stok_keluar")
    return rows
}

const addStokout = async(stok_keluar)=>{
    const {quantity} = stok_keluar
    const query = "insert into stok_keluar" +"(quantyti)" + "values (?)"
    const affected = await db.query (query, [quantity])
    return affected[0].affectedRows
}

module.exports = {getAllStokout,addStokout}