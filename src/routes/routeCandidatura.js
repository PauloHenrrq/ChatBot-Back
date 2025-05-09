import express from 'express'

import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'
import uploadCurriculo from '../middleware/uploadCurriculo.js'

import controllerCandidatura from '../controller/controllerCandidatura.js'
const {
  controllerGetCandidatura: getCandidatura,
  controllerGetCandidaturaID: getCandidaturaID,
  controllerGetCandidaturaCandidatoID: getCandidaturaCandidatoID,
  controllerGetCandidaturaUserID: getCandidaturaUserID,
  controllerPostCandidatura: postCandidatura,
  controllerPutCandidatura: putCandidatura,
  controllerDeleteCandidatura: delCandidatura
} = controllerCandidatura
const candidaturaRoute = express.Router()

candidaturaRoute.get('/candidaturas', authMiddleware, adminMiddleware, getCandidatura)

candidaturaRoute.get('/candidaturas/:id', authMiddleware, getCandidaturaID)

candidaturaRoute.get('/candidaturas/candidatos/:candidatoId', authMiddleware, getCandidaturaCandidatoID)

candidaturaRoute.get('/candidaturas/user/:candidatoId', authMiddleware, getCandidaturaUserID)
  
candidaturaRoute.post('/candidaturas', authMiddleware, uploadCurriculo.single('curriculo'), postCandidatura)

candidaturaRoute.put('/candidaturas/:id', authMiddleware, putCandidatura)

candidaturaRoute.delete('/candidaturas/:id', authMiddleware, delCandidatura)

export default candidaturaRoute