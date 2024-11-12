import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserServiceService } from '../service/user-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

   user  : User = new User ();


   constructor( private userService : UserServiceService,   private router: Router ) {}

   ajoutUser(){

    
    this.userService.register(this.user).subscribe(reponse =>{
       
    });

}
  
      
         
   }

  

