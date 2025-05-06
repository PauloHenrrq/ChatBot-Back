import Candidato from "../models/Candidato"
import Candidatura from "../models/Candidatura"
import Vaga from "../models/Vaga"

const syncTables = async() => {
    Candidato.sync(/*{ alter: true }*/),
    Candidatura.sync(),
    Vaga.sync()
}

export default syncTables