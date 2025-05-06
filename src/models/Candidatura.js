import { DataTypes } from 'sequelize'
import DBConnection from '../database/database.js'
import Vaga from './Vaga.js'
import Candidato from './Candidato.js'

const Candidatura = DBConnection.define('Candidatura', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Candidato,
      key: 'id'
    }
  },
  vagaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vaga,
      key: 'id'
    }
  },
  vagaTitulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.JSON,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  curriculo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Candidatura
