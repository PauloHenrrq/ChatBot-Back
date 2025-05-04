import Candidatura from '../models/Candidatura'
import answers from '../responses'

async function getCandidatura (req, res) {
  try {
    const getCandidatura = await Candidatura.findAll()

    if (!getCandidatura) {
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

async function postCandidatura (req, res) {
  try {
    const {
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

    if (
      !vagaTitulo ||
      !nome ||
      !email ||
      !dataNascimento ||
      !telefone ||
      !endereco ||
      !endereco.rua ||
      !endereco.numero ||
      !endereco.bairro ||
      !endereco.cidade ||
      !endereco.estado ||
      !endereco.cep ||
      !descricao ||
      !curriculo ||
      !status
    ) {
      return answers.badRequest(res, 'Os campos não podem estar vazios')
    }

    

  } catch (error) {}
}
