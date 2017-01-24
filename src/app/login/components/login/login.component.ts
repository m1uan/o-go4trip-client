// 
// File generated by `npm run generate:blank login/components/login/login`
//
// After activate you can access from 
//
// http://localhost:5000/#/dev/login/components/login/login
//
//
// for ACTIVATE please add IMPORT and ROUTE in `src/app/dashboard/dashboard.ts`
//
// /*
//  * Here is router imports
//  */
// import { Login } from './login/components/login/login';
// 
//  ..
//  ..
//  ..
//
//  @RouteConfig([
//      { path: '/dev/login/components/login/login', component: Login, name: 'Loginlogin-components/login/login' },   
//
//  ..
//  .. 
//


import { Component, ViewContainerRef, ElementRef } from '@angular/core';

import { AppState } from '../app.service';


import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Comment } from '../model/comment';
import { Observable } from 'rxjs/Rx';


import { Router, ActivatedRoute, Params } from '@angular/router';

import * as numeral from 'numeral';
import * as moment from 'moment';
import * as _ from 'lodash';

import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';

import {EviService} from '../../../shared/services/evi.service';

let $ = require('jquery/dist/jquery.js');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
   styleUrls: [ './login.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // Set our default values
  email = 'test';
  password = 'test';
  
  // TypeScript public modifiers
  constructor(private evi : EviService, private route : ActivatedRoute, private _el: ElementRef ) {
      
  }

  ngOnInit() {

  }


  onLogin(){
    let data = {email: this.email, password: this.password};
    this.evi.http.post('users/login', data).subscribe((data)=>{
        this.evi.settings.login(data);
        console.log('this.evi.http.get', data);
        this.evi.http.get('users/profile').subscribe((data)=>{
          console.log('this.evi.http.get', data);
        });
    });
  }

  onFacebook(){

  }

}