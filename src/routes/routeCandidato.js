import express from "express"

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import uploadImg from "../middleware/uploadImg.js";

import controllerCandidato from "../controller/controllerCandidato.js";
const { 
    controllerGetCandidato: getCandidato,
    controllerGetCandidatoID: getCandidatoID,
    controllerPostCandidato: postCandidato,
    controllerPutCandidato: putCandidato,
    controllerDeleteCandidato: delCandidato
 } = controllerCandidato
const candidatoRoute = express.Router()

candidatoRoute.get("/users", authMiddleware, adminMiddleware, getCandidato)

candidatoRoute.get('/users/:id', authMiddleware, getCandidatoID)

candidatoRoute.post('/users', uploadImg.single('img'), postCandidato) 

candidatoRoute.put('/users/:id', authMiddleware, putCandidato)

candidatoRoute.delete('/users/:id', authMiddleware, adminMiddleware, delCandidato)

export default candidatoRoute
