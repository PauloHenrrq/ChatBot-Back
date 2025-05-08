import answers from '../responses.js'

const adminMiddleware = (req, res, next) => {
  console.log('req.user:', req.user)
  if (req.user.role != 'admin') {
    return answers.unauthorized(
      res,
      'Acesso negado. Você não possui acesso de administrador'
    )
  }

  next()
}

export default adminMiddleware