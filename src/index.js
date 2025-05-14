import express from 'express'
import cors from 'cors'
import candidatoRoute from './routes/routeCandidato.js'
import candidaturaRoute from './routes/routeCandidatura.js'
import loginRoute from './routes/routeLogin.js'
import vagaRoute from './routes/routeVaga.js'
import notificacaoRoute from './routes/routeNotificacao.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)

app.use(candidatoRoute)
app.use(candidaturaRoute)
app.use(vagaRoute)
app.use(loginRoute)
app.use(notificacaoRoute)

app.use('/uploads', express.static('uploads'))

export default app
