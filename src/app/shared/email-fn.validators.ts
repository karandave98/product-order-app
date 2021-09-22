import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidation(): ValidatorFn {
    return (control: AbstractControl): {notMatched: boolean} | null  => {
        if (control.dirty && control.value ) {
            const emailVal = control.value;
            const regexp = new RegExp('^[A-Za-z0-9+_.-]+@(.+)$');
            const matchEmail = regexp.test(emailVal.toLowerCase());
            if (matchEmail) {
                return null;
            } else {
                return {notMatched: true};
            }

        }
        return {notMatched: false};
    };
}
