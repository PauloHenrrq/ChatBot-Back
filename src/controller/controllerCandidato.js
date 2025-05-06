import serviceCandidato from "../services/serviceCandidato.js"

const { getCandidato, getCandidatoID, postCandidato, putCandidato, deleteCandidato } = serviceCandidato

const controllerGetCandidato = (req, res) => {
    getCandidato(req, res)
}

const controllerGetCandidatoID = (req, res) => {
    getCandidatoID(req, res)
}

const controllerPostCandidato = (req, res) => {
    postCandidato(req, res)
}

const controllerPutCandidato = (req, res) => {
    putCandidato(req, res)
}

const controllerDeleteCandidato = (req, res) => {
    deleteCandidato(req, res)
}

export default {
    controllerGetCandidato,
    controllerGetCandidatoID,
    controllerPostCandidato,
    controllerPutCandidato,
    controllerDeleteCandidato
}
