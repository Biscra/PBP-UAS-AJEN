const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const register = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({
                message: "Username dan password wajib diisi"
            })
        }
        const user = await userModel.findByUsername(username)
        if (user.length > 0) {
            return res.status(409).json({
                message: "Username sudah terdaftar"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await userModel.createUser(username, hashPassword)
        res.status(201).json({
            message: "Register berhasil"
        })
    } catch (error) {
        res.status(500).json({
            message: "Register gagal",
            error: error.message
        })
    }
}
const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({
                message: "Username dan password wajib diisi"
            })
        }
        const user = await userModel.findByUsername(username)
        if (user.length === 0) {
            return res.status(401).json({
                message: "Username atau password salah"
            })
        }
        const isMatch = await bcrypt.compare(password, user[0].password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Username atau password salah"
            })
        }
        const token = jwt.sign(
            { id: user[0].id, username: user[0].username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
        res.json({
            message: "Login berhasil",
            token
        })
    } catch (error) {
        res.status(500).json({
            message: "Login gagal",
            error: error.message
        })
    }
}

module.exports = {register,login}