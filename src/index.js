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
app.use('/uploads', express.static('uploads'))

export default app
