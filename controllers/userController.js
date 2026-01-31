const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

const getAllUser = async (req, res) => {
    try {
        const users = await userModel.getAllUser()
        if (users.length > 0) {
            res.status(200).json({
                message: "Success get all users",
                data: users
            })
        } else {
            res.status(200).json({
                message: "User not found",
                data: []
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error get all users",
            error: error.message
        })
    }
}
const getUserById = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id)
        if (user) {
            res.status(200).json({
                message: "User found",
                data: user
            })
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error get user",
            error: error.message
        })
    }
}
const createUser = async (req, res) => {
    const { username, password, role } = req.body
    if (!username || !password || !role) {
        return res.status(400).json({
            message: "Username, password, and role are required"
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const affected = await userModel.createUser({
            username,
            password: hashedPassword,
            role
        })
        if (affected === 1) {
            res.status(201).json({
                message: "User created successfully",
                data: {
                    username,
                    role
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error create user",
            error: error.message
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const affected = await userModel.deleteUser(req.params.id)
        if (affected === 1) {
            res.status(200).json({
                message: "User deleted successfully"
            })
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error delete user",
            error: error.message
        })
    }
}

module.exports = {getAllUser,getUserById,createUser,deleteUser}
