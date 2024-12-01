import { Component } from '@angular/core';
import { PopupadduserComponent } from './popupadduser/popupadduser.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}
  title = 'frontend';

  openPopup(): void {
    this.dialog.open(PopupadduserComponent, {
      width: '400px', // Largeur de la fenêtre
      data: { message: 'Hello, Angular!' }, // Passer des données optionnelles
    });
  }
}
