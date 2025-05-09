import express from "express"

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import controllerCandidato from "../controller/controllerCandidato.js";
const { 
    controllerGetCandidato: getCandidato,
    controllerGetCandidatoID: getCandidatoID,
    controllerPostCandidato: postCandidato,
    controllerPutCandidato: putCandidato,
    controllerDeleteCandidato: delCandidato
 } = controllerCandidato
const routeCandidato = express.Router()

routeCandidato.get("/users", authMiddleware, adminMiddleware, getCandidato)

routeCandidato.get('/users/:id', authMiddleware, getCandidatoID)

routeCandidato.post('/users', postCandidato) 

routeCandidato.put('/users/:id', authMiddleware, putCandidato)

routeCandidato.delete('/users/:id', authMiddleware, adminMiddleware, delCandidato)

export default routeCandidato
