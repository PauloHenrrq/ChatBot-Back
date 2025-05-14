import serviceNotificacao from '../services/serviceNotificacao.js'

const { getNotificacao, getNotificacaoUserID, postNotificacao, delNotificacao } = serviceNotificacao

const controllerGetNotificacao = (req, res) => {
  getNotificacao(req, res)
}

const controllerGetNotificacaoUserID = (req, res) => {
  getNotificacaoUserID(req, res)
}

const controllerPostNotificacao = (req, res) => {
  postNotificacao(req, res)
}

const controllerDelNotificacao = (req, res) => {
  delNotificacao(req, res)
}

export default {
  controllerGetNotificacao,
  controllerGetNotificacaoUserID,
  controllerPostNotificacao,
  controllerDelNotificacao
}
