export class Tache {
    description_tache ?: string;
    id_membre?: string; // L'ID de l'utilisateur (représente l'ObjectId de MongoDB)
    id_projet?: string; // L'ID du projet (représente l'ObjectId de MongoDB)
    date_echeance?: Date;
    status ?: 'À faire' | 'En cours' | 'Terminé'; // Le statut de la tâche
    priorite ?: 'Basse' | 'Moyenne' | 'Haute'; // La priorité de la tâche
  }
  
