import app from './index.js'
import syncTables from './database/sync-tables.js'
import fs from 'fs'
import path from 'path'
import bcrypt from "bcrypt"
import Candidato from './models/Candidato.js'

const port = process.env.SERVER_PORT
const NAME_ADMIN = process.env.NAME_ADMIN
const EMAIL_ADMIN = process.env.EMAIL_ADMIN
const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN

async function createUserAdmin () {
  try {
    const existingAdmin = await Candidato.findOne({
      where: {
        role: 'admin'
      }
    })

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(PASSWORD_ADMIN, 10) // Usando hash assíncrono
      await Candidato.create({
        name: NAME_ADMIN,
        email: EMAIL_ADMIN,
        data_nascimento: '2005-06-09',
        telefone: '',
        password: hashedPassword,
        role: 'admin'
      }) 
      console.log("Admin criado com sucesso")
    } else {
      console.log("Admin já foi criado")
    }
  } catch (error) {
    console.error("Houve um erro ao criar o admin:", error.message)
  }
}

const curriculosDir = path.join('uploads', 'curriculos')

if (!fs.existsSync(curriculosDir)) {
  fs.mkdirSync(curriculosDir, { recursive: true })
}

const initServer = async () => {
  await syncTables()
  await createUserAdmin()
  app.listen(port, (error) => {
    if (error) {
      console.error("Erro ao iniciar o servidor:", error)
    } else {
      console.log(`Server is running on port ${port}`)
    }
  })
}

initServer()