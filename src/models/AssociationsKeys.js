import Candidato from '../models/Candidato.js'
import Candidatura from '../models/Candidatura.js'
import Vaga from '../models/Vaga.js'
import CandidatoSocial from './CandidatoSocial.js'
import Notificacao from './Notificacao.js'

Vaga.hasMany(Candidatura, { foreignKey: 'vagaId' })
Candidatura.belongsTo(Vaga, { foreignKey: 'vagaId' })

Candidato.hasMany(Candidatura, { foreignKey: 'candidatoId' })
Candidatura.belongsTo(Candidato, { foreignKey: 'candidatoId' })

Candidato.hasMany(Notificacao, { foreignKey: 'userId' })
Notificacao.belongsTo(Candidato, { foreignKey: 'userId' })

Candidato.hasOne(CandidatoSocial, { foreignKey: 'candidatoId' })
CandidatoSocial.belongsTo(Candidato, { foreignKey: 'candidatoId' })

export default () => {}
