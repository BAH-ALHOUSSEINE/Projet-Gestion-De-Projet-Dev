import { Component, Inject,ChangeDetectorRef } from '@angular/core';
import { Projet } from '../../models/projet';
import {ProjetService} from  '../../service/projet.service';
import { ProjectDetailComponent } from '../../project-detail/project-detail.component';
import { User } from '../../models/user';
/**
 * Component representing the About View.
 */
@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrl: './about-view.component.css'
})
export class AboutViewComponent {
  /**
   * Indicates whether the dialog is shown.
   */
  showdiallogue?: boolean;

  /**
   * User instance.
   */
  user: User = new User();

  /**
   * Error code.
   */
  error: number = 0;

  /**
   * Error message.
   */
  errorMessage: String = "";

  /**
   * User ID.
   */
  iduser?: String;

  /**
   * Indicates whether the user is an admin.
   */
  isadmin?: boolean = true;

  /**
   * Mock project instance.
   */
  projectMock: Projet = new Projet();

  /**
   * Constructor for AboutViewComponent.
   * @param project - Injected project instance.
   * @param cdr - ChangeDetectorRef instance.
   * @param serviveproject - Project service instance.
   * @param projectdetail - Project detail component instance.
   */
  constructor(
    @Inject('project') public project: Projet,
    private cdr: ChangeDetectorRef,
    private serviveproject: ProjetService,
    private projectdetail: ProjectDetailComponent
  ) {
    this.projectMock = this.project;
  }

  /**
   * Cancels the current operation and hides the dialog.
   */
  Annuler() {
    this.showdiallogue = false;
  }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      console.log(this.project);
      this.iduser = String(sessionStorage.getItem('iduser') || "");
      if (this.iduser !== this.project?.id_admin) {
        this.isadmin = false;
        console.log("Utilisateur non administrateur :", this.iduser, this.project?.id_admin);
      } else {
        this.isadmin = true;
      }
    } else {
      console.warn("sessionStorage n'est pas disponible.");
      this.iduser = "";
      this.isadmin = false;
    }
    this.cdr.markForCheck();
  }

  /**
   * Adds a member to the project.
   */
  ajoutermembre() {
    console.log("user-email : ", this.user.email);
    this.serviveproject.addmembre(this.project._id, this.user).subscribe((newUser: User) => {
      this.projectMock.membres?.push(newUser);
      console.log("new user : ", newUser);
      this.cdr.detectChanges();
    });
  }

  /**
   * Deletes a member from the project.
   * @param email - Email of the member to be deleted.
   */
  deleteprojetmembre(email: string | undefined) {
    if (!email) {
      console.error("Email non spécifié !");
      return;
    }

    this.serviveproject.deleteProjectmembre(this.project._id, email).subscribe({
      next: (response: User) => {
        this.project.membres = this.project.membres?.filter(membre => membre.email !== email);
        this.cdr.detectChanges();
        console.log(`Membre avec l'email ${email} supprimé avec succès.`);
      },
      error: (err) => {
        console.error("Erreur lors de la suppression du membre :", err);
      },
    });
  }

  /**
   * Opens the dialog.
   */
  openDialog() {
    this.showdiallogue = true;
  }

  /**
   * Formats a date in French locale.
   * @param date - Date to be formatted.
   * @returns Formatted date string.
   */
  formatDateInFrench(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }
}
