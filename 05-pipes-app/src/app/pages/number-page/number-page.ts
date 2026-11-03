import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-number-page',
  imports: [DecimalPipe, PercentPipe, CurrencyPipe, Header],
  templateUrl: './number-page.html',
})
export default class NumberPage {
  totalSells = signal(2_433_232.5567);
  percent = signal(0.4856);
}
