import { CategorieTache } from "./categorie-tache";
import { Sprint } from "./sprint";
import { User } from "./user";

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

    static fromData(projectData: any): Projet {
      const projet = new Projet();
      projet._id = projectData._id;
      projet.nom_projet = projectData.nom_projet;
      projet.id_admin = projectData.id_admin;
      projet.type_projet = projectData.type_projet;
      projet.description_projet = projectData.description_projet;
      projet.date_debut = new Date(projectData.date_debut);
      projet.date_fin = new Date(projectData.date_fin);
      
      // Vérifier si projectData.membres est défini et est un tableau avant d'utiliser map
      projet.membres = Array.isArray(projectData.membres)
      ? projectData.membres.map((membre: any) => {
            const user = new User();
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
                    categorie.taches = [];
                    return categorie;
                })
              : [];
            
            return sprint;
        })
      : [];
         
      
      return projet;
    }


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

  
  