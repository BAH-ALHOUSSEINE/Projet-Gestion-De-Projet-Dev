import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { User } from '../models/user';
import {ProjetService} from  '../service/projet.service';
import { Projet } from '../models/projet';
import { ActivatedRoute } from '@angular/router';
import { Injector } from '@angular/core';
@Component({
  selector: 'app-popupadduser',
  templateUrl: './popupadduser.component.html',
  styleUrl: './popupadduser.component.css'
})
export class PopupadduserComponent {
  user : User = new User();
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private projectService: ProjetService, private route: ActivatedRoute, private injector: Injector,) {}
  
   showdiallogue  : boolean= true;






  
}
