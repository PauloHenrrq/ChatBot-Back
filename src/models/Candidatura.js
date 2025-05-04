import { DataTypes } from 'sequelize'
import DBConnection from '../database/database.js'
import Vagas from './Vaga.js'

const Candidatura = DBConnection.define('Candidatura', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vagaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vagas,
      key: 'id'
    }
  },
  vagaTitulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  telefone: {
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

Candidatura.belongsTo(Vagas, { foreignKey: 'vagaId' })

export default Candidatura
