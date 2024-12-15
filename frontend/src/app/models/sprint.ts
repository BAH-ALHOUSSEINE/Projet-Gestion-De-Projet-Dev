import { CategorieTache } from "./categorie-tache";
import { Status } from "./status.enum";

/**
 * Represents a Sprint in the project management system.
 */
export class Sprint {
    /**
     * The unique identifier of the sprint.
     */
    _id?: string;

    /**
     * The start date of the sprint.
     */
    date_debut?: Date;

    /**
     * The end date of the sprint.
     */
    date_fin?: Date;

    /**
     * The current status of the sprint.
     */
    status?: Status;

    /**
     * The list of task categories associated with the sprint.
     */
    categorie_tache?: CategorieTache[];
}
