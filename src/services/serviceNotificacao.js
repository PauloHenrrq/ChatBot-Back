import answers from '../responses.js'
import Notificacao from '../models/Notificacao.js'

async function getNotificacao (req, res) {
  try {
    const getNotificacao = await Notificacao.findAll()

    if (getNotificacao.length === 0) {
      return answers.notFound(res, 'Nenhuma notificação')
    }

    return answers.success(res, 'Notificações retornadas', getNotificacao)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao retornar as Notificações',
      error
    )
  }
}

async function getNotificacaoUserID (req, res) {
  try {
    const { userId } = req.params

    const findNotificacaoUserID = await Notificacao.findAll({
      where: {
        userId: userId
      }
    })

    if (findNotificacaoUserID === 0) {
      return answers.notFound(res, 'Notificação não encontrada')
    }

    return answers.success(res, 'Notificação encontrada', findNotificacaoUserID)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Ocorreu um erro ao buscar a Notificação'
    )
  }
}

async function postNotificacao (req, res) {
  try {
    const { userId, vagaEmpresa, vagaTitulo, visto } = req.body

    if (!userId || !vagaEmpresa || !vagaTitulo) {
      return answers.badRequest(res, 'As informações não podem estar vazias')
    }

    const notificacaoCreate = await Notificacao.create({
      userId,
      vagaEmpresa,
      vagaTitulo,
      visto: visto || false
    })

    return answers.created(
      res,
      'Notificação criada com sucesso',
      notificacaoCreate
    )
  } catch (error) {
    return answers.internalServerError(res, 'Houve um erro ao postar a notificação')
  }
}

async function delNotificacao (req, res) {
  try {
    const { id } = req.params

    const findNotificacao = await Notificacao.findOne({
      where: {
        id: id
      }
    })

    if (!findNotificacao) {
      return answers.notFound(res, 'Notificação não encontrada')
    }

    await findNotificacao.destroy()

    return answers.success(res, 'Notificação excluída', findNotificacao)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro na exclusão da Notificação'
    )
  }
}

export default {
  getNotificacao,
  getNotificacaoUserID,
  postNotificacao,
  delNotificacao
}
