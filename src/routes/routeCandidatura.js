import express from 'express'

import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

import controllerCandidatura from '../controller/controllerCandidatura.js'
const {
  controllerGetCandidatura: getCandidatura,
  controllerGetCandidaturaID: getCandidaturaID,
  controllerPostCandidatura: postCandidatura,
  controllerPutCandidatura: putCandidatura,
  controllerDeleteCandidatura: delCandidatura
} = controllerCandidatura
const candidaturaRoute = express.Router()

candidaturaRoute.get('/candidaturas', authMiddleware, adminMiddleware, getCandidatura)

candidaturaRoute.get('/candidaturas/:id', authMiddleware, getCandidaturaID)

candidaturaRoute.post('/candidaturas', authMiddleware, postCandidatura)

candidaturaRoute.put('/candidaturas/:id', authMiddleware, putCandidatura)

candidaturaRoute.delete('/candidatura/:id', authMiddleware, delCandidatura)

export default candidaturaRoute