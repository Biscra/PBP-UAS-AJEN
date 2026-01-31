const db = require('../config/db')

// ============ FUNGSI UTAMA USERS ============
const getAllUser = async () => {
    const [rows] = await db.query("SELECT * FROM users")
    return rows
}

const getUserById = async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id])
    return rows[0]
}

const findByUsername = async (username) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
    )
    return rows[0]
}

const createUser = async (user) => {
    const { username, password, role, full_name, email } = user
    const query = "INSERT INTO users (username, password, role, full_name, email) VALUES (?, ?, ?, ?, ?)"
    const [result] = await db.query(query, [username, password, role || 'user', full_name, email])
    return { id: result.insertId, affectedRows: result.affectedRows }
}

const updateUser = async (id, userData) => {
    const { full_name, email, role } = userData
    const query = "UPDATE users SET full_name = ?, email = ?, role = ? WHERE id = ?"
    const [result] = await db.query(query, [full_name, email, role, id])
    return result.affectedRows
}

const deleteUser = async (id) => {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id])
    return result.affectedRows
}

// ============ FUNGSI FDA UNTUK USERS ============
const logFDAActivity = async (userId, action, details) => {
    const query = `
        INSERT INTO user_activities 
        (user_id, activity_type, activity_details, ip_address, user_agent) 
        VALUES (?, ?, ?, ?, ?)
    `
    
    const [result] = await db.query(query, [
        userId,
        'FDA_' + action,
        JSON.stringify(details),
        details.ip || '127.0.0.1',
        details.userAgent || 'Unknown'
    ])
    return result.affectedRows
}

const getUserFDAImports = async (userId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit
    
    const query = `
        SELECT mfi.*, m.name as medicine_name, m.generic_name
        FROM medicines_fda_import mfi
        LEFT JOIN medicines m ON mfi.id = m.fda_import_id
        WHERE mfi.imported_by = ?
        ORDER BY mfi.imported_at DESC
        LIMIT ? OFFSET ?
    `
    
    const countQuery = `
        SELECT COUNT(*) as total 
        FROM medicines_fda_import 
        WHERE imported_by = ?
    `
    
    const [rows] = await db.query(query, [userId, limit, offset])
    const [countRows] = await db.query(countQuery, [userId])
    
    return {
        data: rows,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: countRows[0].total,
            pages: Math.ceil(countRows[0].total / limit)
        }
    }
}

module.exports = {getAllUser,getUserById,findByUsername,createUser,updateUser,deleteUser,logFDAActivity,getUserFDAImports}