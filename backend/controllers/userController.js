const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// @desc Register a new user
// @route POST /api/users
// @access Admin
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, isAdmin} = req.body
    // Validation
    if(!name || !email|| !password) {
        res.status(400)
        throw new Error('אנא מלא את כל השדות')
    }
    // Find if user already exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new error('Invalid user data')
    }
})

// @desc Login new user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    
    // Check user and passwords match
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

// Generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @desc Get users
// route GET api/users
// @access Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json({users})
})

// @desc Delete users
// route DELETE api/users
// @access Admin
const deleteUser = asyncHandler(async (req, res) => {
    const {body} = req.body
    await User.deleteMany({ _id: {
        $in: body
    }})
    res.status(200).json(body)
})

// @desc Edit user
// route PUT api/users/:userId
// @access Admin
const updateUser = asyncHandler(async (req, res) => {
    // Validation
    if(!req.body.name || !req.body.email) {
        res.status(400)
        throw new Error('אנא מלא שם מלא ואימייל')
    }
    const user = await User.findById(req.params.userId)

    if(!user) {
        res.status(404)
        throw new Error('המשתמש לא נמצא')
    }
    

    if(!req.body.password) {
        delete req.body['password']
    } else {
        // Hash password
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true})

    res.status(200).json(updatedUser)
})


module.exports = {
    registerUser,
    loginUser,
    getUsers,
    deleteUser,
    updateUser
}