import { Component, signal } from '@angular/core';
import { Card } from '../../components/card/card';
import {
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { interval, tap } from 'rxjs';

interface CustomerInterface {
  name: string;
  gender: 'male' | 'female';
  age: number;
  address: string;
}

interface ProfileInterface {
  name: string;
  age: number;
  address: string;
}

const customer1: CustomerInterface = {
  name: 'Felipe',
  gender: 'male',
  age: 34,
  address: 'Ottawa, Canada',
};

const customer2: CustomerInterface = {
  name: 'Carolina',
  gender: 'female',
  age: 37,
  address: 'New York, EE.UU',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [
    Card,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe,
  ],
  templateUrl: './uncommon-page.html',
})
export default class UncommonPage {
  // i18n Select
  customer = signal<CustomerInterface>(customer1);

  invitationMaP = {
    male: 'Mr.',
    female: 'Mrs.',
  };

  changeCustomer() {
    if (this.customer() === customer1) {
      this.customer.set(customer2);
    } else {
      this.customer.set(customer1);
    }
  }

  // i18n Plural
  customersMap = signal({
    '=0': 'There are no customer in line',
    '=1': 'We have a customer in line',
    other: 'We have # customers in line',
  });

  customers = signal<string[]>([
    'Maria',
    'Enrique',
    'Mercedes',
    'lucia',
    'Bolo',
    'Tobias',
    'Felipe',
    'Nicolas',
    'Estanislao',
    'Juan Manuel',
  ]);

  deleteClientFromLine() {
    this.customers.update((prev) => prev.slice(1));
  }

  // KeyValue Pipe
  profile: ProfileInterface = {
    name: 'Santino',
    age: 34,
    address: 'Buenos Aires, Argentina',
  };

  // Async Pipe
  promiseResponse = signal<string>('Loading...');
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      // 1. If you want to simulate an error:
      // const errorMsg = 'We have an error with the data';
      // this.promiseResponse.set(errorMsg);
      // reject(errorMsg);

      // 2. Or if it were successful:
      const response = 'We have data in the promise.';
      this.promiseResponse.set(response);
      resolve(response);
    }, 3500);
  });

  myObservableTimer = interval(1000).pipe(tap((value) => console.log(value)));
}
