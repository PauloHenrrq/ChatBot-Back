import Candidatura from '../models/Candidatura.js'
import Vaga from '../models/Vaga.js'
import answers from '../responses.js'

async function getCandidatura (req, res) {
  try {
    const getCandidatura = await Candidatura.findAll()

    if (getCandidatura.length === 0) {
      return answers.notFound(res, 'Candidaturas não encontradas')
    }

    return answers.success(res, 'Candidaturas encontradas', getCandidatura)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao retornar as Candidaturas'
    )
  }
}

async function getCandidaturaID (req, res) {
  try {
    const { id } = req.params

    const getCandidatura = await Candidatura.findOne({
      where: {
        id: id
      }
    })

    if (!getCandidatura) {
      return answers.notFound(res, 'Nenhuma Candidatura encontrada')
    }

    return answers.success(
      res,
      'Candidatura encontrada com sucesso',
      getCandidatura
    )
  } catch (error) {}
}

async function postCandidatura (req, res) {
  try {
    const {
      userId,
      vagaId,
      vagaTitulo,
      telefone,
      descricao,
      status
    } = req.body

    const endereco = req.body.endereco ? JSON.parse(req.body.endereco) : null
    const curriculo = req.file ? req.file.filename : null

    console.log(req.body)

    if (
      !userId ||
      !vagaId ||
      !vagaTitulo ||
      !telefone ||
      !endereco ||
      !endereco.rua ||
      !endereco.numero ||
      !endereco.bairro ||
      !endereco.cidade ||
      !endereco.estado ||
      !endereco.cep ||
      !descricao ||
      !curriculo
    ) {
      return answers.badRequest(res, 'Os campos não podem estar vaziossssssss')
    }

    const checkVaga = await Vaga.findOne({
      where: {
        userId,
        vagaId
      }
    })

    if (checkVaga) {
      return answers.badRequest(
        res,
        'Você já fez uma candidatura para essa vaga'
      )
    }

    const candidaturaCreate = await Candidatura.create({
      userId,
      vagaId,
      vagaTitulo,
      telefone,
      endereco,
      descricao,
      curriculo,
      status
    })

    return answers.created(res, 'Candidatura enviada!', candidaturaCreate)
  } catch (error) {
    return answers.internalServerError(res, req.body)
  }
}

async function putCandidatura (req, res) {
  try {
    const { id } = req.params
    const {
      vagaId,
      vagaTitulo,
      nome,
      email,
      dataNascimento,
      telefone,
      endereco,
      descricao,
      curriculo,
      status
    } = req.body

    const findCandidatura = await Candidatura.findOne({
      where: {
        id: id
      }
    })

    if (!putCandidatura) {
      return answers.notFound(res, 'Candidatura não existe')
    }

    const updatedData = {
      vagaId: vagaId ?? findCandidatura.vagaId,
      vagaTitulo: vagaTitulo ?? findCandidatura.vagaTitulo,
      nome: nome ?? findCandidatura.nome,
      email: email ?? findCandidatura.email,
      dataNascimento: dataNascimento ?? findCandidatura.dataNascimento,
      telefone: telefone ?? findCandidatura.telefone,
      endereco: endereco ?? findCandidatura.endereco,
      descricao: descricao ?? findCandidatura.descricao,
      curriculo: curriculo ?? findCandidatura.curriculo,
      status: status ?? findCandidatura.status
    }

    const candidaturaUpdate = await Candidatura.update(updatedData, {
      where: {
        email: email
      }
    })

    return answers.success(res, 'Candidatura atualizada!', candidaturaUpdate)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao atualizar a candidatura.',
      error
    )
  }
}

async function deleteCandidatura (req, res) {
  try {
    const { id } = req.params

    const findCandidatura = await Candidatura.findOne({
      where: {
        id: id
      }
    })

    if (!findCandidatura) {
      return answers.notFound(res, 'Candidatura não encontrada')
    }

    await Candidatura.destroy({
      where: {
        id: id
      }
    })

    return answers.success(res, 'Candidatura excluída', findCandidatura)
  } catch (error) {
    return answers.internalServerError(res, 'Houve um erro ao excluir a Candidatura', error)
  }
}

export default {
  getCandidatura,
  getCandidaturaID,
  postCandidatura,
  putCandidatura,
  deleteCandidatura
}