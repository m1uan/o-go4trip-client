/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, ElementRef, AfterViewInit  } from '@angular/core';

import { AppState } from './app.service';

let $ = require('jquery/dist/jquery.js');
let foundation = require('foundation-sites/dist/js/foundation.js');
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  template: `
    <a class="tiny button" href="#">So Tiny</a>
    <nav>
      <span>
        <a [routerLink]=" ['./'] ">
          Index
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./home'] ">
          Home
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./trip'] ">
          Trip
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./about'] ">
          About
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./invoice'] ">
          New Invoice
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./account'] ">
          Account
        </a>
      </span>|
      <span>
        <a [routerLink]=" ['./login'] ">
          Login
        </a>
      </span>|
      <span>
        <a [routerLink]=" ['./place'] ">
          Place
        </a>
      </span>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    
  `
})
export class AppComponent  {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(
    private _el: ElementRef,
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  ngAfterViewInit() {
    $(this._el.nativeElement.ownerDocument).foundation();
    console.log('$(this._el.nativeElement.ownerDocument).foundation()');
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
