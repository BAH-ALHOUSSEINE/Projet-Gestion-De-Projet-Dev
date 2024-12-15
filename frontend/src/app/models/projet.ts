import { CategorieTache } from "./categorie-tache";
import { Sprint } from "./sprint";
import { Tache } from "./tache";
import { User } from "./user";

/**
 * Represents a project.
 */
export class Projet {
    _id ?: string; // L'identifiant du projet (représente l'ObjectId de MongoDB)
    nom_projet ?: string;
    id_admin ?: string; // L'id de l'administrateur (représente l'ObjectId de MongoDB)
    type_projet ?: string;
    description_projet ?: string;
    date_debut ?: Date;
    date_fin ?: Date;
    membres ?: User[]; // Un tableau d'ObjectId représentant les membres
    sprints ?: Sprint[]

      /**
   * Creates an instance of Projet from raw project data.
   * @param projectData - The raw project data.
   * @returns A new instance of Projet.
   */
    static fromData(projectData: any): Projet {
      const projet = new Projet();
      projet._id = projectData._id;
      projet.nom_projet = projectData.nom_projet;
      projet.id_admin = projectData.id_admin._id;
      projet.type_projet = projectData.type_projet;
      projet.description_projet = projectData.description_projet;
      projet.date_debut = new Date(projectData.date_debut);
      projet.date_fin = new Date(projectData.date_fin);
      
      // Vérifier si projectData.membres est défini et est un tableau avant d'utiliser map
      projet.membres = Array.isArray(projectData.membres)
      ? projectData.membres.map((membre: any) => {
            const user = new User();
            user._id = membre._id;
            user.nom = membre.name;
            user.prenom = membre.prenom;
            user.email = membre.email;
            user.password = membre.password;
            return user;
        })
      : [];



      projet.sprints = Array.isArray(projectData.sprints)
      ? projectData.sprints.map((s: any) => {
            const sprint = new Sprint();
            sprint._id = s._id;
            sprint.date_debut = s.date_debut;
            sprint.date_fin = s.date_fin;
            sprint.status = s.status;
    
            // Initialiser les catégories de tâches si elles existent dans les données
            sprint.categorie_tache = Array.isArray(s.categorie_tache)
              ? s.categorie_tache.map((ct: any) => {
                    const categorie = new CategorieTache();
                    categorie._id = ct._id;
                    categorie.nom = ct.nom;
                    categorie.taches =     // Ajouter les tâches à la catégorie si elles existent
                    categorie.taches = Array.isArray(ct.taches)
                      ? ct.taches.map((t: any) => {
                            const tache = new Tache();
                            tache._id = t._id;
                            tache.description = t.description;            
                            tache.date_echeance = new Date(t.date_echeance)
                            tache.status = t.status;
                            tache.priorite = t.priorite;
                            if (t.id_membre) {
                              const membre = projet.membres!.find((m: User) => m._id === t.id_membre);
                              tache.membre = membre ? membre : null;                                                              
                            }
                            return tache;
                        })
                      : [];
                    return categorie;
                })
              : [];
            
            return sprint;
        })
      : [];
         
      
      return projet;
    }

  /**
   * Formats a date in French locale.
   * @param date - The date to format.
   * @returns The formatted date string in French locale or "Date inconnue" if the date is null/undefined.
   */
    formatDateInFrench(date: Date | null | undefined): string {
      if (!date) {
        return "Date inconnue"; // Message par défaut si la date est null/undefined
      }
      return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }

    

  }

  
  