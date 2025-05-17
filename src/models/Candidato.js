import { DataTypes } from 'sequelize'
import DBConnection from '../database/database.js'

const Candidato = DBConnection.define('Candidato', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
  descricao: {
    type: DataTypes.TEXT('tiny'),
    allowNull: true
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

export default Candidato
