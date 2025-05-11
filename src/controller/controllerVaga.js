import serviceVaga from "../services/serviceVaga.js";

const { getVaga, getVagaID, getVagaStatus, postVaga, putVaga, deleteVaga } = serviceVaga

const controllerGetVaga = (req, res) => {
    getVaga(req, res)
}

const controllerGetVagaID = (req, res) => {
    getVagaID(req, res)
}

const controllerPostVaga = (req, res) => {
    postVaga(req, res)
}

const controllerPutVaga = (req, res) => {
    putVaga(req, res)
}

const controllerDeleteVaga = (req, res) => {
    deleteVaga(req, res)
}

export default {
    controllerGetVaga,
    controllerGetVagaID,
    controllerPostVaga,
    controllerPutVaga,
    controllerDeleteVaga
}