import { FormGroup, FormArray, ValidationErrors, AbstractControl } from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}
export class FormUtils {
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$';

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value
        ? null
        : {
            fieldsNotEqual: true,
          };
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();

    const fromValue = control.value;

    if (fromValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }

    return null;
  }

  static usernameAlreadyInUse(control: AbstractControl): ValidationErrors | null {
    const fromValue = control.value;

    return fromValue === 'strider'
      ? {
          usernameTaken: true,
        }
      : null;
  }

  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Required field';
        case 'minlength':
          return `Min of ${errors['minlength'].requiredLength} characters`;
        case 'min':
          return `Min value of ${errors['min'].min}`;
        case 'emailTaken':
          return 'The email is already in use';
        case 'usernameTaken':
          return 'The username is already in use';
        case 'pattern':
          if (errors['pattern'].requiredPattern === this.namePattern) {
            return 'Name must include a first and last name.';
          }
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return 'Invalid email';
          }
          if (errors['pattern'].requiredPattern === this.notOnlySpacesPattern) {
            return 'The username cannot contain spaces.';
          }
          if (errors['pattern'].requiredPattern === this.passwordPattern) {
            return 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one letter.';
          }
          return 'Pattern error';

        default:
          return `Uncontrolled error`;
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return !!formArray.controls[index].errors && formArray.controls[index].touched;
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);
  }
}
