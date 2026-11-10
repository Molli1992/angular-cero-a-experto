import { FormGroup, FormArray, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Required field';
        case 'minlength':
          return `Min of ${errors['minlength'].requiredLength} characters`;
        case 'min':
          return `Min value of ${errors['min'].min}`;
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
