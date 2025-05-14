import { DataTypes } from "sequelize";
import DBConnection from "../database/database.js";
import Candidato from "./Candidato.js";

const Notificacao = DBConnection.define("Notificacao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Candidato,
            key: 'id'
        }
    },
    vagaEmpresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vagaTitulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    visto: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

export default Notificacao