import {FormGroup, ValidatorFn} from '@angular/forms';

export function pswMatchConfirmPsw(form: FormGroup) {
  const psw = form.get("password")?.value;
  const confirmPsw = form.get("confermaPassword")?.value;

  if (psw && confirmPsw) {
    checkTwoValues(psw, confirmPsw)
  }
}

function checkTwoValues(psw: any, confirmPsw: any) {

  if (psw !== confirmPsw) {
    confirmPsw.setErrors({passwordMismatch: true})
    return {passwordMismatch: true};

  } else {
    return null;
  }
}
