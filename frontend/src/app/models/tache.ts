import { User } from "./user";

export class Tache {
    _id?: string;
    description ?: string;
    membre?: User | null;
        date_echeance?: Date;
    status ?: 'A faire' | 'En cours' | 'Terminé'; // Le statut de la tâche
    priorite ?: 'Basse' | 'Moyenne' | 'Haute'; // La priorité de la tâche
  }
  
