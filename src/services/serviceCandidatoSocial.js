import answers from '../responses.js'
import CandidatoSocial from '../models/CandidatoSocial.js'

async function getCandidatoSocial (req, res) {
  try {
    const getCandidatoSocial = await CandidatoSocial.findAll()

    if (getCandidatoSocial.length === 0) {
      return answers.notFound(
        res,
        'Nenhum Candidato com Midias sociais encontrado.'
      )
    }

    return answers.success(
      res,
      ('Midias sociais do Candidato retornado com sucesso.', getCandidatoSocial)
    )
  } catch (error) {
    return answers.internalServerError(
      res,
      'Ocorreu um erro no retorno das Midias Sociais',
      error
    )
  }
}

async function getCandidatoSocialID (req, res) {
  try {
    const { id } = req.params

    const getWithID = await CandidatoSocial.findOne({
      where: {
        candidatoId: id
      }
    })

    if (!getWithID) {
      return answers.notFound(
        res,
        'Midias sociais do Candidato não foram encontradas.'
      )
    }

    return answers.success(
      res,
      'Midias sociais retornadas com sucesso',
      getWithID
    )
  } catch (error) {
    return answers.internalServerError(
      res,
      'Ocorreu um erro no retorno das Midias Sociais',
      error
    )
  }
}

async function manipulatingCandidatoSocial (req, res) {
  try {
    const { id } = req.params
    const { linkedin, github } = req.body

    if (!id || isNaN(id)) {
      return answers.badRequest(res, 'É necessário informar o ID do candidato')
    }

    const checkSocial = await CandidatoSocial.findOne({
      where: {
        candidatoId: id
      }
    })

    const data = {
      linkedin: linkedin === '' || linkedin === null ? null : linkedin,
      github: github === '' || github === null ? null : github
    }

    if (checkSocial) {
      const updateSocial = await checkSocial.update(data)

      return answers.success(
        res,
        'Informações atualizadas com sucesso',
        updateSocial
      )
    }

    const creatingSocial = await CandidatoSocial.create({
      candidatoId: id,
      linkedin: linkedin,
      github: github
    })

    return answers.created(res, 'Sucesso ao criar', creatingSocial)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao criar/atualizar o Social do Candidato',
      error
    )
  }
}

export default {
  getCandidatoSocial,
  getCandidatoSocialID,
  manipulatingCandidatoSocial
}