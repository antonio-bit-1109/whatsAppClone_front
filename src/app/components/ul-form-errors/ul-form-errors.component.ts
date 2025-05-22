import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

interface ErrorFormValidators {
  nomeCampoForm: string | null,
  errType: string,
  msgErr: string
}


// invece di creare un lista ul per tenere traccia degli errori dei validators del form
// uso un componente apposito da passare dentro i form per le validazioni dei campi.
// bisogna passare:
// 1. la variabile form
// 2. un oggetto di tipo ErrorFormValidators che contiene rispettivamente:
// a. nome del campo da validare
// b. tipo di errore del validators
// c. messaggio da mostrare nella <li>
@Component({
  selector: 'app-ul-form-errors',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './ul-form-errors.component.html',
  styleUrl: './ul-form-errors.component.scss'
})
export class UlFormErrorsComponent {

  @Input() form: FormGroup | undefined;
  @Input() errorsType: ErrorFormValidators[] = []

  public checkIfErrorAndTouched(field: string | null, errType: string) {

    if (field && this.form && this.form.get(field)?.hasError(errType) &&
      this.form.get(field)?.touched) {
      return true
    }

    if (field === null) {
      return this.getCustomError(errType)
    }

    return false;
  }

  public getCustomError(errorFieldName: string) {
    if (this.form && this.form.hasError(errorFieldName) &&
      this.form.touched) {
      return true
    }
    return false;
  }


}
