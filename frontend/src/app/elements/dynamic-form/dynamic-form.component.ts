import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  @Input() formConfig: any[] = []; // Configuration des champs du formulaire
  @Input() formData: any = {};    // Données initiales du formulaire
  @Output() formSubmit = new EventEmitter<any>(); // Événement pour soumettre les données
  @Output() formCancel = new EventEmitter<void>(); // Événement pour annuler
  @Input() formHeader: string = 'Dynamic Form'; // Titre du formulaire

  
  submitForm() {
    this.formSubmit.emit(this.formData);
  }

  cancelForm() {
    this.formCancel.emit();
  }
}