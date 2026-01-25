const db = require('../config/db')
const { updateCategory } = require('./categoryModel')

const getAllTransaction = async () =>{
    const [rows] = await db.query("select * from transaksi")
    return rows
}
const getTransactionByCode = async(code) =>{
    const [row] = await db.query("select * from transaksi where id_transaksi=?",[code])
    return row[0]
}
const delTransaction = async (id)=> {
    const aff = await db.query("Delete from transaksi where id_transaksi", [id])
    return aff[0].affectedRows
}
const addTransaction = async(transaksi) =>{
    const {id_obat, id_sk, harga, waktu} = transaksi
    const query = "insert into transaksi" + "(id_obat,id_sk,harga,waktu)" + "values (?,?,?,?)"
    const affected = await db.query (query, [id_obat, id_sk, harga, waktu])
    return affected[0].affectedRows
}

module.exports = {getAllTransaction,getTransactionByCode,delTransaction,addTransaction}