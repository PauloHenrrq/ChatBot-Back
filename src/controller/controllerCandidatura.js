import serviceCandidatura from "../services/serviceCandidatura.js";

const { getCandidatura, getCandidaturaID, postCandidatura, putCandidatura, deleteCandidatura } = serviceCandidatura

const controllerGetCandidatura = (req, res) => {
    getCandidatura(req, res)
}

const controllerGetCandidaturaID = (req, res) => {
    getCandidaturaID(req, res)
}

const controllerPostCandidatura = (req, res) => {
    postCandidatura(req, res)
}

const controllerPutCandidatura = (req, res) => {
    putCandidatura(req, res)
}

const controllerDeleteCandidatura = (req, res) => {
    deleteCandidatura(req, res)
}

export default {
    controllerGetCandidatura,
    controllerGetCandidaturaID,
    controllerPostCandidatura,
    controllerPutCandidatura,
    controllerDeleteCandidatura
}