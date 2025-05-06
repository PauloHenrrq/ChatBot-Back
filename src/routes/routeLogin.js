import express from 'express'

import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

import controllerLogin from '../controller/controllerLogin.js'
const login = controllerLogin

const loginRoute = express.Router()

loginRoute('/', login)

export default loginRoute