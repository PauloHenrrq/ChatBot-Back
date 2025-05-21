import serviceCandidatoSocial from "../services/serviceCandidatoSocial.js";

const { getCandidatoSocial, getCandidatoSocialID, manipulatingCandidatoSocial } = serviceCandidatoSocial

const controllerGetCandidatoSocial = (req, res) => {
    getCandidatoSocial(req, res)
}

const controllerGetCandidatoID = (req, res) => {
    getCandidatoSocialID(req, res)
}

const controllerManipulatingCandidatoSocial = (req, res) => {
    manipulatingCandidatoSocial(req, res)
}

export default {
    controllerGetCandidatoSocial,
    controllerGetCandidatoID,
    controllerManipulatingCandidatoSocial
}