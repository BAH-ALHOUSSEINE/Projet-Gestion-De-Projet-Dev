import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { User } from '../models/user';
import {ProjetService} from  '../service/projet.service';
import { ActivatedRoute } from '@angular/router';
import { Injector } from '@angular/core';
/**
 * Component for adding a user through a popup dialog.
 * 
 * @selector 'app-popupadduser'
 * @templateUrl './popupadduser.component.html'
 * @styleUrl './popupadduser.component.css'
 */
export class PopupadduserComponent {
  /**
   * The user object to be added.
   */
  user: User = new User();

  /**
   * Indicates whether the dialog is shown.
   */
  showdiallogue: boolean = true;

  /**
   * Constructor for PopupadduserComponent.
   * 
   * @param data - Data injected into the dialog.
   * @param projectService - Service for project-related operations.
   * @param route - Activated route for the component.
   * @param injector - Injector for dependency injection.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjetService,
    private route: ActivatedRoute,
    private injector: Injector
  ) {}
}
