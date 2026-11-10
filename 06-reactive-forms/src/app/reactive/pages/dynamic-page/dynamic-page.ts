import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from '@angular/forms';
import { FormUtils } from '../../../utils/formUtils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
})
export class DynamicPage {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([], [Validators.required, Validators.minLength(3)]),
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  newFavoriteGame = new FormControl('', Validators.required);

  onAddToFavorite() {
    if (this.newFavoriteGame.invalid) return;
    const newGame = this.newFavoriteGame.value;

    this.favoriteGames.push(this.formBuilder.control(newGame, Validators.required));
    this.favoriteGames.markAsTouched();
    this.newFavoriteGame.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.favoriteGames.clear();
    this.myForm.reset({
      name: '',
      favoriteGames: [],
    });
  }
}
