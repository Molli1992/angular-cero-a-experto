import {
  afterNextRender,
  afterEveryRender,
  Component,
  OnChanges,
  OnInit,
  effect,
  signal,
} from '@angular/core';
import { Title } from '../../components/title/title';

const log = (...messages: string[]) => {
  console.log(`${messages[0]} %c${messages.slice(1).join(', ')}`, 'color: green');
};

@Component({
  selector: 'app-home-page',
  imports: [Title],
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit, OnChanges {
  name = 'Felipe';
  lastName = 'Blaksley';
  traditionalProperty = `${this.name}`;
  signalProperty = signal(`${this.name}`);

  constructor() {
    log('Constructor', 'It is executed when Angular creates the component class instance.');

    /*
    setTimeout(() => {
      this.signalProperty.set('Carolina Presta');
      log('setTimeout 1', 'done');
    }, 2000);

    setTimeout(() => {
      this.traditionalProperty = 'Carolina Presta';
      log('setTimeout 2', 'done');
    }, 3000);
    */
  }

  changeTraditional() {
    this.traditionalProperty = `${this.name} ${this.lastName}`;
  }

  changeSignal() {
    this.signalProperty.set(`${this.name} ${this.lastName}`);
  }

  basicEffect = effect((onCleanup) => {
    log('effect', 'Trigger side effects');

    onCleanup(() => {
      log('OnCleanup', 'It is executed when the effect is about to be destroyed');
    });
  });

  ngOnInit() {
    log('ngOnInit', "Runs once after Angular has initialized all the component's inputs.");
  }

  ngOnChanges() {
    log('ngOnChanges', "Runs every time the component's inputs have changed.");
  }

  ngDoCheck() {
    log('gDoCheck', 'Runs every time this component is checked for changes.');
  }

  ngAfterContentInit() {
    log('ngAfterContentInit', "Runs once after the component's content has been initialized.");
  }

  ngAfterContentChecked() {
    log(
      'ngAfterContentChecked',
      'Runs every time this component content has been checked for changes.',
    );
  }

  ngAfterViewInit() {
    log('ngAfterViewInit', "Runs once after the component's view has been initialized.");
  }

  ngAfterViewChecked() {
    log('ngAfterViewChecked', "Runs every time the component's view has been checked for changes.");
  }

  ngOnDestroy() {
    log('ngOnDestroy', 'Runs once before the component is destroyed.');
  }

  afterNextRenderEffect = afterNextRender(() => {
    log(
      'afterNextRender',
      '	Runs once the next time that all components have been rendered to the DOM.',
    );
  });

  afterEveryRenderEffect = afterEveryRender(() => {
    log('afterEveryRender', '	Runs every time all components have been rendered to the DOM.');
  });
}
