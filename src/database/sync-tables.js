import AssociationsKeys from "../models/AssociationsKeys.js";
import Candidato from "../models/Candidato.js";
import Candidatura from "../models/Candidatura.js";
import Vaga from "../models/Vaga.js";
import DBConnection from "./database.js";

AssociationsKeys()

const syncTables = async () => {
  await DBConnection.sync(/*{ alter: true }*/);
  await Candidato.sync(/*{ alter: true }*/);
  await Vaga.sync();
  await Candidatura.sync();
};

export default syncTables;