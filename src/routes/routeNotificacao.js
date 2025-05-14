import controllerNotificacao from '../controller/controllerNotificacao.js'
import express from 'express'

import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const { 
    controllerGetNotificacao: getNotificacao, 
    controllerGetNotificacaoUserID: getNotificacaoID,
    controllerPostNotificacao: postNotificacao,
    controllerDelNotificacao: delNotificacao
 } = controllerNotificacao
const notificacaoRoute = express.Router()

notificacaoRoute.get('/notificacao', authMiddleware, adminMiddleware, getNotificacao)

notificacaoRoute.get('/notificacao/:userId', authMiddleware, getNotificacaoID)

notificacaoRoute.post('/notificacao', authMiddleware, adminMiddleware, postNotificacao)

notificacaoRoute.delete('/notificacao/:id', authMiddleware, delNotificacao)

export default notificacaoRoute