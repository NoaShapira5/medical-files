const express = require('express')
const router = express.Router()
const {loginUser, registerUser, getUsers, deleteUser, updateUser} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')


router.route('/').post(protect, registerUser).get(protect, getUsers).delete(protect, deleteUser)
router.post('/login', loginUser)
router.route('/:userId').put(protect, updateUser)

module.exports = router