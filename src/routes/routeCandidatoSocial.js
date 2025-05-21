import express from 'express'
import controllerCandidatoSocial from '../controller/controllerCandidatoSocial.js'

import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const {
  controllerGetCandidatoSocial: getSocial,
  controllerGetCandidatoID: getSocialID,
  controllerManipulatingCandidatoSocial: manipulatingSocial
} = controllerCandidatoSocial
const socialRoute = express.Router()

socialRoute.get('/social', authMiddleware, adminMiddleware, getSocial)

socialRoute.get('/social/:id', authMiddleware, getSocialID)

socialRoute.put('/social/:id', authMiddleware, manipulatingSocial)

export default socialRoute