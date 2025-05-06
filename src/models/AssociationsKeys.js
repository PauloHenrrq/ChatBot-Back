import Candidato from '../models/Candidato.js';
import Candidatura from '../models/Candidatura.js';
import Vaga from '../models/Vaga.js';

Vaga.hasMany(Candidatura, { foreignKey: 'vagaId' });
Candidatura.belongsTo(Vaga, { foreignKey: 'vagaId' });
Candidato.hasMany(Candidatura, { foreignKey: 'candidatoId' });
Candidatura.belongsTo(Candidato, { foreignKey: 'candidatoId' });

export default () => {}; // Pode exportar uma função vazia