import { DataTypes } from 'sequelize'
import DBConnection from '../database/database.js'
import Candidato from './Candidato.js'

const CandidatoSocial = DBConnection.define('candidatoSocial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  candidatoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Candidato,
      key: 'id'
    }
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  github: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

export default CandidatoSocial