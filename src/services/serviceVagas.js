import answers from '../responses.js'
import Vaga from '../models/Vaga.js'

async function getVaga (req, res) {
  try {
    const getVagas = await Job.findAll()

    if (getVagas.length === 0) {
      return answers.notFound(res, 'Nenhuma Vaga foi criada')
    }

    return answers.created(res, 'Vagas encontradas', getVagas)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao retornar as vagas',
      error
    )
  }
}

async function postVaga (req, res) {
  try {
    const {
      titulo,
      empresa,
      localizacao,
      descricao,
      requisitos,
      responsabilidades,
      beneficios,
      salario,
      informacoes_adicionais
    } = req.body

    if (
      !titulo ||
      !empresa ||
      !localizacao ||
      !descricao ||
      !requisitos ||
      !responsabilidades ||
      !beneficios ||
      !salario ||
      !informacoes_adicionais
    ) {
      return answers.badRequest(
        res,
        'Todos os campos precisam estar preenchidos'
      )
    }

    const checkingVaga = await Job.findOne({
      where: {
        titulo: titulo,
        empresa: empresa,
        localizacao: localizacao,
        descricao: descricao,
        requisitos: requisitos,
        responsabilidades: responsabilidades,
        beneficios: beneficios,
        salario: salario,
        informacoes_adicionais: informacoes_adicionais
      }
    })

    if (checkingVaga) {
      return answers.badRequest(res, 'Uma vaga com essas informações já existe')
    }

    const vagaCreate = await Job.create({
      title,
      enterprise,
      location,
      description,
      detailedDescription,
      salary
    })

    return answers.created(res, 'Vaga criada com sucesso', vagaCreate)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao criar uma vaga',
      error
    )
  }
}

async function putVaga (req, res) {
  try {
    const { id } = req.params
    const {
      titulo,
      empresa,
      localizacao,
      descricao,
      requisitos,
      responsabilidades,
      beneficios,
      salario,
      informacoes_adicionais
    } = req.body

    const findVaga = await Vaga.findOne({
      where: {
        id: id
      }
    })
    if (!findVaga) {
      return answers.badRequest(res, 'A vaga não existe')
    }

    const updatedVaga = {
      titulo: titulo ?? findVaga.titulo,
      empresa: empresa ?? findVaga.empresa,
      localizacao: localizacao ?? findVaga.localizacao,
      descricao: descricao ?? findVaga.descricao,
      requisitos: requisitos ?? findVaga.requisitos,
      responsabilidades: responsabilidades ?? findVaga.responsabilidades,
      beneficios: beneficios ?? findVaga.beneficios,
      salario: salario ?? findVaga.salario,
      informacoes_adicionais: informacoes_adicionais ?? findVaga.informacoes_adicionais
    }

    await Vaga.update(updatedVaga, {
      where: {
        id: id
      }
    })

    const showingVaga = await Vaga.findOne({
      where: {
        id: id
      }
    })

    return answers.success(res, `Vaga atualizada com sucesso`, showingVaga)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao atualizar a vaga',
      error
    )
  }
}

async function deleteVaga (req, res) {
  try {
    const { id } = req.params

    const vagaCheck = await Vaga.findOne({
      where: {
        id: id
      }
    })

    if(!vagaCheck) {
        return answers.badRequest(res, "Essa vaga não existe")
    }

    Vaga.destroy({
      where: {
        id: id
      }
    })

    return answers.success(res, 'Vaga deletada com sucesso', vagaDestroyed)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao deletar a vaga',
      error
    )
  }
}

export default {
    getVaga,
    postVaga,
    putVaga,
    deleteVaga
}