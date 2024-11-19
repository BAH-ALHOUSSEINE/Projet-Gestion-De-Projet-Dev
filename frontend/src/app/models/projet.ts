export class Projet {
    nom_projet ?: string;
    id_admin ?: string; // L'id de l'administrateur (représente l'ObjectId de MongoDB)
    type_projet ?: string;
    description_projet ?: string;
    date_debut ?: Date;
    date_fin ?: Date;
    membres ?: string[]; // Un tableau d'ObjectId représentant les membres

    static fromData(projectData: any): Projet {
      const projet = new Projet();
      projet.nom_projet = projectData.nom_projet;
      projet.id_admin = projectData.id_admin;
      projet.type_projet = projectData.type_projet;
      projet.description_projet = projectData.description_projet;
      projet.date_debut = new Date(projectData.date_debut);
      projet.date_fin = new Date(projectData.date_fin);
      
      // Vérifier si projectData.membres est défini et est un tableau avant d'utiliser map
      projet.membres = Array.isArray(projectData.membres) 
        ? projectData.membres.map((membre: any) => membre) 
        : []; // Si membres n'est pas un tableau, initialiser comme un tableau vide
      
      return projet;
    }

  }

  
  