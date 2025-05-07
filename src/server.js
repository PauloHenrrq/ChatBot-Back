import app from './index.js'
import syncTables from './database/sync-tables.js'

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

    const hashedPassword = bcrypt.hashSync(PASSWORD_ADMIN, 10)
    if(!existingAdmin) {
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
    console.log("Houve um erro ao criar o admin", error.message)
  }
}

const initServer = async () => {
  await syncTables()
  await createUserAdmin()
  app.listen(port, error => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

initServer()
