import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TacheComponent } from './tache/tache.component';
import { ProjetComponent } from './projet/projet.component';
import { UserComponent } from './user/user.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UserService } from './service/auth.service';
import { APP_INITIALIZER } from '@angular/core';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AboutViewComponent } from './sidebarView/about-view/about-view.component';
import { TaskViewComponent } from './sidebarView/task-view/task-view.component';
import { DynamicFormComponent } from './elements/dynamic-form/dynamic-form.component';
import { CreateProjectFormComponent } from './forms/create-project-form/create-project-form.component';
import { CreateSprintFormComponent } from './forms/create-sprint-form/create-sprint-form.component';






@NgModule({
  declarations: [
    AppComponent,
    TacheComponent,
    ProjetComponent,
    UserComponent,
    ConnexionComponent,
    InscriptionComponent,
    HeaderComponent,
    FooterComponent,
    ProjectDetailComponent,
    AboutViewComponent,
    TaskViewComponent,
    DynamicFormComponent,
    CreateProjectFormComponent,
    CreateSprintFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,


  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
