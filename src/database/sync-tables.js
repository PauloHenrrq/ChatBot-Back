import AssociationsKeys from '../models/AssociationsKeys.js'
import DBConnection from './database.js'

AssociationsKeys()

const syncTables = async () => {
  try {
    await DBConnection.sync({ force: true })

    console.log('Tabelas sincronizadas com sucesso!')
  } catch (error) {
    console.error('Erro ao sincronizar tabelas:', error)
  }
}

export default syncTables
