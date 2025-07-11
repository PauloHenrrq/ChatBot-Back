import answers from '../responses.js'
import Candidato from '../models/Candidato.js'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const SECRET_KEY = process.env.SECRET_KEY

async function login (req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return answers.badRequest(res, 'Preencha os campos')
    }

    const findCandidato = await Candidato.findOne({
      where: {
        email: email
      }
    })
    if (!findCandidato) {
      return answers.badRequest(res, 'Email ou Senha incorretos!')
    }
    const role = findCandidato.role

    const verifyPassword = await bcrypt.compare(
      password,
      findCandidato.password
    )
    if (!verifyPassword) {
      return answers.badRequest(res, 'Email ou Senha incorretos!')
    } else {
      const token = jwt.sign(
        {
          data: {
            id: findCandidato.id,
            role: findCandidato.role
          }
        },
        SECRET_KEY, { expiresIn: '2h' }
      )

      return answers.success(res, { token, role })
    }
  } catch (error) {
    return answers.internalServerError(res, 'Erro ao efetuar o login', error)
  }
}

export default login
