import answers from '../responses.js'
import Candidato from '../models/Candidato.js'

import bcrypt from 'bcrypt'

async function getCandidato (req, res) {
  try {
    const getCandidato = await Candidato.findAll()

    if (getCandidato.length === 0) {
      return answers.notFound(res, 'Nenhum Candidato encontrado')
    }

    return answers.success(
      res,
      'Candidatos encontrado com sucesso',
      getCandidato
    )
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao encontrar os Candidatos',
      error
    )
  }
}

async function postCandidato (req, res) {
  try {
    const { name, email, data_nascimento, password, role } = req.body

    if (!name || !email || !data_nascimento || !password) {
      return answers.badRequest(res, 'Os campos não podem ficar vazios')
    }

    const emailCheck = await Candidato.findOne({
      where: {
        email: email
      }
    })

    if (emailCheck) {
      return answers.badRequest(res, 'Já existe um Candidato com esse e-mail!')
    }

    const passwordCheck = /^{6,32}$/gm
    const passwordIsValid = passwordCheck.test(password)
    if (!passwordIsValid) {
      return answers.badRequest(res, 'A senha precisa conter no mínimo 6 caracteres')
    }

    const encryptedPassword = bcrypt.hashSync(password, 10)
    const candidatoCreated = await Candidato.create({
      name,
      email,
      data_nascimento,
      password: encryptedPassword,
      role: role != 'admin' ? 'user' : 'admin'
    })

    return answers.created(
      res,
      'Candidato cadastrado com sucesso!',
      candidatoCreated
    )
  } catch (error) {
    return answers.internalServerError(res, 'Erro ao cadastrar', error)
  }
}

async function putCandidato (req, res) {
  try {
    const { id } = req.params
    const { name, email, data_nascimento, password } = req.body

    const findCandidato = await Candidato.findOne({
      where: {
        id: id
      }
    })

    if (!findCandidato) {
      return answers.notFound(res, 'Candidato não encontrado.')
    }

    const hashPassword = bcrypt.hashSync(password, 10)
    const updatedData = {
      name: name ?? Candidato.name,
      email: email ?? Candidato.email,
      data_nascimento: data_nascimento ?? Candidato.data_nascimento,
      password: hashPassword ?? Candidato.password
    }

    const candidatoUpdate = await Candidato.update(updatedData, {
      where: {
        email: email
      }
    })

    return answers.success(res, 'Candidato atualizado!', candidatoUpdate)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Erro ao atualizar as informações',
      error
    )
  }
}

async function deleteCandidato (req, res) {
  try {
    const { id } = req.params

    const findCandidato = await Candidato.findOne({
      where: {
        id: id
      }
    })

    if (!findCandidato) {
      return answers.notFound(res, 'Candidato não encontrado')
    }

    await Candidato.destroy({
      where: {
        id: id
      }
    })

    return answers.success(res, 'Candidato excluído', findCandidato)
  } catch (error) {
    return answers.internalServerError(res, 'Houve um erro na exclusão')
  }
}

export default {
  getCandidato,
  postCandidato,
  putCandidato,
  deleteCandidato
}
