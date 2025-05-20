import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

// create your class that extends the angular validator class
export class CustomValidators {
  public static validatePswAndConfirmPsw(control: AbstractControl): ValidationErrors | null {

    const psw = control.get('password')?.value;
    const confirmPsw = control.get('confermaPassword')?.value;

    console.log(psw)
    console.log(confirmPsw)
    if (psw && confirmPsw && psw === confirmPsw) {
      return null;
    } else {
      return {passwordIncorrect: true}
    }

  }
}
