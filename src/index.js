import express from 'express'
import cors from 'cors'
import routeCandidato from './routes/routeCandidato.js'
import candidaturaRoute from './routes/routeCandidatura.js'
import loginRoute from './routes/routeLogin.js'
import vagaRoute from './routes/routeVaga.js'
import profileRoute from './routes/routeProfile.js'
import Vaga from './models/Vaga.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use(routeCandidato)
app.use(candidaturaRoute)
app.use(vagaRoute)
app.use(loginRoute)
app.use(profileRoute)

app.post('/teste-vaga', async (req, res) => {
  try {
    const vaga = await Vaga.create({
      titulo: 'Teste',
      empresa: 'Teste',
      cep: '12345678',
      descricao: 'Descrição teste',
      requisitos: ['Requisito 1'],
      responsabilidades: ['Responsabilidade 1'],
      beneficios: ['Benefício 1'],
      salario: 'R$ 2000',
      informacoes_adicionais: 'Nada'
    })
    res.status(201).json(vaga)
  } catch (error) {
    console.error(error.message)
    console.error(error.stack)
    res.status(500).json({ erro: error.message })
  }
})

export default app
