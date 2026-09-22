import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.html',
  styleUrl: './counter-page.css',
})
export class CounterPage {
  initialCounterValue = 0;
  counter = this.initialCounterValue;
  counterSignal = signal(this.initialCounterValue);

  constructor() {}

  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update((current) => current + value);
  }

  decreaseBy(value: number) {
    this.counter -= value;
    this.counterSignal.update((current) => current - value);
  }

  resetCounter() {
    this.counter = this.initialCounterValue;
    this.counterSignal.set(this.initialCounterValue);
  }
}
