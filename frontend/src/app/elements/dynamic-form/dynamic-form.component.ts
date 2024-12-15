import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component for creating a dynamic form based on provided configuration.
 */
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  /**
   * Configuration of the form fields.
   * @type {any[]}
   */
  @Input() formConfig: any[] = [];

  /**
   * Initial data of the form.
   * @type {any}
   */
  @Input() formData: any = {};

  /**
   * Event emitted when the form is submitted.
   * @type {EventEmitter<any>}
   */
  @Output() formSubmit = new EventEmitter<any>();

  /**
   * Event emitted when the form is cancelled.
   * @type {EventEmitter<void>}
   */
  @Output() formCancel = new EventEmitter<void>();

  /**
   * Header title of the form.
   * @type {string}
   */
  @Input() formHeader: string = 'Dynamic Form';

  /**
   * Submits the form and emits the form data.
   */
  submitForm() {
    this.formSubmit.emit(this.formData);
  }

  /**
   * Cancels the form and emits the cancel event.
   */
  cancelForm() {
    this.formCancel.emit();
  }
}