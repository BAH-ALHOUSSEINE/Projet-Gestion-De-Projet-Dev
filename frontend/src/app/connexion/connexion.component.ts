import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserServiceService } from '../service/user-service.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {


  user  : User = new User ();
  champEmpty  : number = 0;
  errorMessage  : String ="";

  



  constructor( private userService : UserServiceService,   private router: Router ) {
   this.user.email="";
   this.user.password="";

  }


  login(){

    
    if(this.user.password=="" || this.user.email==""){
      this.champEmpty=1;
   }
   else {
   
     console.log(this.user);

    this.userService.login(this.user.email,this.user.password).subscribe(
      


      response => {
       console.log(response);
       console.log(this.user);
       this.router.navigate(['/projet']);
      },
      error => {
        // Si l'API retourne une erreur 400, affichez le message d'erreur
        if (error.status === 401) {
          this.champEmpty  = 0;
          this.errorMessage = error.error.error;  // Message d'erreur de l'API
        }
      }
  
  
  
  );

   }
    

}

}
