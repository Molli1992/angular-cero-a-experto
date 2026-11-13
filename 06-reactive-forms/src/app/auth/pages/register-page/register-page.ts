import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/formUtils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
        [this.formUtils.checkingServerResponse],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          this.formUtils.usernameAlreadyInUse,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.formUtils.passwordPattern),
        ],
      ],
      password2: ['', [Validators.required]],
    },
    { validators: [this.formUtils.isFieldOneEqualFieldTwo('password', 'password2')] },
  );

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({
      name: '',
      email: '',
      username: '',
      password: '',
      password2: '',
    });
  }
}
