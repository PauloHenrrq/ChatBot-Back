import express from 'express'
import cors from 'cors'
import candidatoRoute from './routes/routeCandidato'
import candidaturaRoute from './routes/routeCandidatura'
import loginRoute from './routes/routeLogin'
import vagaRoute from './routes/routeVaga'

const app = express()
app.use(cors())
app.use(express.json())

app.use(candidatoRoute)
app.use(candidaturaRoute)
app.use(vagaRoute)
app.use(loginRoute)

export default app