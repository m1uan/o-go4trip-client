import { Component } from '@angular/core';

import { AppState } from '../app.service';

class InvoiceAddress {
  name : string = 'Milan Medlik';
  company : string = 'happy soft, s. r. o.';
  address : string = 'Lutonina 3';
  zip : string = '76312';
  city : string = 'Vizovice';
  country : string = 'CZ';
}

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'account',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './account.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './account.component.html'
})
export class AccountComponent {
  // Set our default values
  ia = new InvoiceAddress;

  // TypeScript public modifiers
  constructor(public appState: AppState) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    
  }
}
