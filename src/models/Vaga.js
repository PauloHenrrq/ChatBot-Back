import { DataTypes } from 'sequelize'
import DBConnection from '../database/database.js'

const Vaga = DBConnection.define('vaga', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  requisitos: {
    type: DataTypes.JSON,
    allowNull: false
  },
  responsabilidades: {
    type: DataTypes.JSON,
    allowNull: false
  },
  beneficios: {
    type: DataTypes.JSON,
    allowNull: false
  },
  salario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  informacoes_adicionais: {
    type: DataTypes.STRING
  }

})

export default Vaga