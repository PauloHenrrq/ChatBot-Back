import AssociationsKeys from "../models/AssociationsKeys.js";
import Candidato from "../models/Candidato.js";
import Candidatura from "../models/Candidatura.js";
import Vaga from "../models/Vaga.js";

AssociationsKeys()

const syncTables = async () => {
  await Candidato.sync(/*{ alter: true }*/);
  await Vaga.sync();
  await Candidatura.sync();
};

export default syncTables;