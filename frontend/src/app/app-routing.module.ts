import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent} from  './inscription/inscription.component';
import { ConnexionComponent } from  './connexion/connexion.component';
import { ProjetComponent } from './projet/projet.component';
import { DetailProjetComponent } from './detail-projet/detail-projet.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: "Inscription", component : InscriptionComponent },
  {path: "connexion", component : ConnexionComponent },
  {path: "projet", component : ProjetComponent, canActivate: [AuthGuard] }, // Component pour afficher la liste des projets
  {path: 'projets/:id', component: DetailProjetComponent, canActivate: [AuthGuard] }, // Component pour afficher les détails d’un projet
  {path: "", redirectTo: "connexion", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
