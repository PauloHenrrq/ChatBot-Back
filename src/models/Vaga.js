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
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  requisitos: {
    type: DataTypes.TEXT,
    allowNull: false,
    get () {
      const raw = this.getDataValue('requisitos')
      return raw ? JSON.parse(raw) : []
    },
    set (value) {
      this.setDataValue('requisitos', JSON.stringify(value))
    }
  },
  responsabilidades: {
    type: DataTypes.TEXT,
    allowNull: false,
    get () {
      const raw = this.getDataValue('responsabilidades')
      return raw ? JSON.parse(raw) : []
    },
    set (value) {
      this.setDataValue('responsabilidades', JSON.stringify(value))
    }
  },
  beneficios: {
    type: DataTypes.TEXT,
    allowNull: false,
    get () {
      const raw = this.getDataValue('beneficios')
      return raw ? JSON.parse(raw) : []
    },
    set (value) {
      this.setDataValue('beneficios', JSON.stringify(value))
    }
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