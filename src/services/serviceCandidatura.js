import Candidatura from '../models/Candidatura'
import Vaga from '../models/Vaga'
import answers from '../responses'

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

async function postCandidatura (req, res) {
  try {
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

    if (
      !vagaId ||
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
      !curriculo
    ) {
      return answers.badRequest(res, 'Os campos não podem estar vazios')
    }

    const checkVaga = await Vaga.findOne({
      where: {
        id: vagaId
      }
    })

    if (checkVaga && email === checkVaga) {
      return answers.badRequest(res, 'Você já fez uma candidatura para essa vaga')
    }

    

  } catch (error) {

  }
}
