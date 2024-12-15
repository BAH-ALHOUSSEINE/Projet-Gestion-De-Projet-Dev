import { User } from "./user";

/**
 * Represents a task (Tache) in the project management system.
 */
export class Tache {
    /**
     * The unique identifier of the task.
     */
    _id?: string;

    /**
     * The description of the task.
     */
    description?: string;

    /**
     * The member (User) assigned to the task. Can be null.
     */
    membre?: User | null;

    /**
     * The due date of the task.
     */
    date_echeance?: Date;

    /**
     * The status of the task.
     * Can be 'À faire' (To do), 'En cours' (In progress), or 'Terminé' (Completed).
     */
    status?: 'À faire' | 'En cours' | 'Terminé';

    /**
     * The priority of the task.
     * Can be 'Basse' (Low), 'Moyenne' (Medium), or 'Haute' (High).
     */
    priorite?: 'Basse' | 'Moyenne' | 'Haute';
}
  

