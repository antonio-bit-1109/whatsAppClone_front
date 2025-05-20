import {AbstractControl, ValidationErrors} from '@angular/forms';

/**
 * A utility class for custom form validators,
 * providing methods to perform specific validation logic.
 */
export class CustomValidators {
  public static validatePswAndConfirmPsw(control: AbstractControl): ValidationErrors | null {

    const psw = control.get('password')?.value;
    const confirmPsw = control.get('confermaPassword')?.value;
    
    if (psw && confirmPsw && psw === confirmPsw) {
      return null;
    } else {
      return {passwordIncorrect: true}
    }

  }
}
