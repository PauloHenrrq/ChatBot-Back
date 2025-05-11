import express from 'express'

import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

import controllerVaga from '../controller/controllerVaga.js'
const {
    controllerGetVaga: getVaga,
    controllerGetVagaID: getVagaID,
    controllerGetVagaStatus: getVagaStatus,
    controllerPostVaga: postVaga,
    controllerPutVaga: putVaga,
    controllerDeleteVaga: delVaga
} = controllerVaga
const vagaRoute = express.Router()

vagaRoute.get('/vagas', authMiddleware, getVaga)

vagaRoute.get('/vagas/:id', authMiddleware, getVagaID)

vagaRoute.post('/vagas', authMiddleware, adminMiddleware, postVaga)

vagaRoute.put('/vagas/:id', authMiddleware, adminMiddleware, putVaga)

vagaRoute.delete('/vagas/:id', authMiddleware, adminMiddleware, delVaga)

export default vagaRoute
