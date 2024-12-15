import { Tache } from "./tache";

/**
 * Represents a category of tasks.
 */
export class CategorieTache {

    /**
     * The unique identifier of the category.
     */
    _id?: string;

    /**
     * The name of the category.
     */
    nom?: String;

    /**
     * The list of tasks associated with the category.
     */
    taches?: Tache[];
}
