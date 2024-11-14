import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent} from  './inscription/inscription.component';
import { ConnexionComponent } from  './connexion/connexion.component';
import { ProjetComponent } from './projet/projet.component';
const routes: Routes = [
  {path: "Inscription", component : InscriptionComponent },
  {path: "connexion", component : ConnexionComponent },
  {path: "projet", component : ProjetComponent },
  {path: "", redirectTo: "connexion", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
