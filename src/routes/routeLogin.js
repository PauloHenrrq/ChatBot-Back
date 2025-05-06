import express from 'express'

import controllerLogin from '../controller/controllerLogin.js'
const login = controllerLogin

const loginRoute = express.Router()

loginRoute.post('/', login)

export default loginRoute