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

async function getCandidatoID (req, res) {
  try {
    const { id } = req.params

    const getCandidato = await Candidato.findOne({
      where: {
        id: id
      }
    })

    if (!getCandidato) {
      return answers.notFound(res, 'Candidato encontrado')
    }

    return answers.success(
      res,
      'Candidato encontrado com sucesso',
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

    const passwordCheck = /^.{6,32}$/
    const passwordIsValid = passwordCheck.test(password)
    if (!passwordIsValid) {
      return answers.badRequest(
        res,
        'A senha precisa conter no mínimo 6 caracteres'
      )
    }

    const encryptedPassword = bcrypt.hashSync(password, 10)
    const candidatoCreated = await Candidato.create({
      name,
      email,
      data_nascimento,
      password: encryptedPassword,
      role: role || 'user'
    })

    return answers.created(
      res,
      'Candidato cadastrado com sucesso!',
      candidatoCreated
    )
  } catch (error) {
    console.error('Erro ao cadastrar candidato:', error)
    return answers.internalServerError(
      res,
      'Erro ao cadastrar candidato',
      error.message
    )
  }
}

async function putCandidato (req, res) {
  try {
    const { id } = req.params
    const { name, email, data_nascimento, bio, password } = req.body

    const findCandidato = await Candidato.findOne({
      where: { id }
    })

    if (!findCandidato) {
      return answers.notFound(res, 'Candidato não encontrado.')
    }

    let img = null
    if (req.file) {
      img = req.file.filename
    }

    let hashedPassword = findCandidato.password
    if (password) {
      hashedPassword = bcrypt.hashSync(password, 10)
    }

    const updatedData = {
      name: name ?? findCandidato.name,
      email: email ?? findCandidato.email,
      data_nascimento: data_nascimento ?? findCandidato.data_nascimento,
      bio: bio ?? findCandidato.bio,
      img: img,
      password: hashedPassword
    }

    await Candidato.update(updatedData, {
      where: { id }
    })

    const candidatoAtualizado = await Candidato.findOne({ where: { id } })

    return answers.success(res, 'Candidato atualizado!', candidatoAtualizado)
  } catch (error) {
    console.error('Erro no putCandidato:', error)
    return answers.internalServerError(
      res,
      'Erro ao atualizar as informações',
      error.message
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
  getCandidatoID,
  postCandidato,
  putCandidato,
  deleteCandidato
}
