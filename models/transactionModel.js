const db = require('../config/db')
const { updateCategory } = require('./categoryModel')

const getAllTransaction = async () =>{
    const [rows] = await db.query("select * from transaksi")
    return rows
}
const addTransaction = async(transaksi) =>{
    const {id_obat, id_sk, harga, waktu} = transaksi
    const query = "insert into transaksi" + "(id_obat,id_sk,harga,waktu)" + "values (?,?,?,?)"
    const affected = await db.query (query, [id_obat, id_sk, harga, waktu])
    return affected[0].affectedRows
}
const delTransaction = async(id)=>{
    const [result] = await db.query(
        "DELETE FROM transaksi WHERE id=?",
        [id]
    )
    return result.affectedRows
}
module.exports = {getAllTransaction,addTransaction,delTransaction}
