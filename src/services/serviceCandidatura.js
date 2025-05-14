import Candidatura from '../models/Candidatura.js'
import answers from '../responses.js'

async function getCandidatura (req, res) {
  try {
    const getCandidatura = await Candidatura.findAll()

    if (getCandidatura.length === 0) {
      return answers.success(res, 'Candidaturas não encontradas', [])
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
  } catch (error) {
    return answers.internalServerError(res, 'Ocorreu um erro ao retornar a Candidatura')
  }
}

async function getCandidaturaCandidatoID (req, res) {
  try {
    const { candidatoId } = req.params

    const getCandidatura = await Candidatura.findAll({
      where: {
        candidatoId: candidatoId
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
  } catch (error) {
    return answers.internalServerError(res, 'Ocorreu um erro ao retornar a Candidatura')
  }
}

async function getCandidaturaUserID (req, res) {
  try {
    const { candidatoId } = req.params

    const userId = req.user.id

    const getCandidatura = await Candidatura.findOne({
      where: {
        candidatoId: candidatoId,
        userId: userId 
      }
    })

    if (!getCandidatura) {
      return answers.badRequest(res, 'Candidatura não encontrada')
    }

    return answers.success(res, 'Candidatura encontrada com sucesso', getCandidatura)
  } catch (error) {
    return answers.internalServerError(res, 'Erro interno no servidor ao retornar a candidatura')
  }
}

const postCandidatura = async (req, res) => {
  try {
    const {
      userId,
      vagaId,
      vagaTitulo,
      telefone,
      descricao,
      status
    } = req.body;

    const endereco = JSON.parse(req.body.endereco);
    const curriculo = req.file;

    if (!curriculo || !curriculo.filename) {
      return answers.badRequest(res, 'É necessário enviar um currículo');
    }

    if (!endereco) {
      return answers.badRequest(res, 'Endereço incorreto');
    }

    if (!userId || !vagaId || !vagaTitulo || !telefone || !descricao) {
      return answers.badRequest(res, 'Os campos não podem estar vazios');
    }

    const checkVaga = await Candidatura.findOne({
      where: {
        userId,
        vagaId
      }
    });

    if (checkVaga) {
      return answers.badRequest(res, 'Você já fez uma candidatura para essa vaga');
    }

    const candidaturaCreate = await Candidatura.create({
      userId,
      vagaId,
      vagaTitulo,
      telefone,
      endereco,
      descricao,
      curriculo: curriculo.filename, 
      status,
      candidatoId: userId
    });

    return answers.created(res, 'Candidatura enviada!', candidaturaCreate);
  } catch (error) {
    return answers.internalServerError(res, 'Houve um erro ao criar a candidatura', error);
  }
};


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

    if (!findCandidatura) {
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
        id: id
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
    const candidaturaId = Number(id);

    const findCandidatura = await Candidatura.findOne({
      where: {
        id: candidaturaId
      }
    })

    await Candidatura.destroy({
      where: {
        id: candidaturaId
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
  getCandidaturaCandidatoID,
  getCandidaturaUserID,
  postCandidatura,
  putCandidatura,
  deleteCandidatura
}