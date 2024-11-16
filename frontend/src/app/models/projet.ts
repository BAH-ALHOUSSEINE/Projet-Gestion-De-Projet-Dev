export class Projet {
    nom_projet ?: string;
    id_admin ?: string; // L'id de l'administrateur (représente l'ObjectId de MongoDB)
    type_projet ?: string;
    description ?: string;
    date_debut ?: Date;
    date_fin ?: Date;
    membres ?: string[]; // Un tableau d'ObjectId représentant les membres
    id ?: string; // L'id du projet (représente l'ObjectId de MongoDB)
  }
  