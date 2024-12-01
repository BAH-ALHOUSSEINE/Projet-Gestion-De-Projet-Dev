import { CategorieTache } from "./categorie-tache";
import { Status } from "./status.enum";

export class Sprint {


    _id ? : string
    date_debut ?: Date;
    date_fin?: Date;
    status ?: Status
    categorie_tache?: CategorieTache[];



 
}
