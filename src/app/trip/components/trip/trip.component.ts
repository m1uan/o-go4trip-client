// 
// File generated by `npm run generate:blank place/components/trip`
//
// After activate you can access from 
//
// http://localhost:5000/#/dev/place/components/trip
//
//
// for ACTIVATE please add IMPORT and ROUTE in `src/app/dashboard/dashboard.ts`
//
// /*
//  * Here is router imports
//  */
// import { Trip } from './place/components/trip';
// 
//  ..
//  ..
//  ..
//
//  @RouteConfig([
//      { path: '/dev/place/components/trip', component: Trip, name: 'Tripplace-components/trip' },   
//
//  ..
//  .. 
//


import { Component, ViewContainerRef, ElementRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ResizeEvent } from 'angular-resizable-element';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { DragulaService, dragula } from 'ng2-dragula';

import * as numeral from 'numeral';
import * as moment from 'moment';
import * as _ from 'lodash';

import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';

import {EviService} from '../../../shared/services/evi.service';



let $ = require('jquery/dist/jquery.js');
let foundation = require('foundation-sites/dist/js/foundation.js');

interface PlaceInfo {
  places : Array<any>;
  current : any;
  index : number;
}

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
   styleUrls: [ './trip.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './trip.component.html'
})
export class TripComponent {
  
  public places = [
    {name: 'Zlin'},
    {name: 'Brno'},
    {name: 'Praha'}
  ]
  
  public style: Object = {};
   
  placeInfos : Array<PlaceInfo> = [] as Array<PlaceInfo>; 
    
  // TypeScript public modifiers
  constructor(private evi : EviService, private route : ActivatedRoute, private _el: ElementRef, private _dragulaService : DragulaService ) {
    
    // http://valor-software.com/ng2-dragula/index.html
    
    // _dragulaService.setOptions('bag', {
    //     moves: function (el, container, handle) {
    //       return handle.className === 'handle';
    //     }
    // });
    _dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    
    _dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
    
    _dragulaService.drag.subscribe((value) => {
      //this.onDrag(value.slice(1));
    });
    _dragulaService.drop.subscribe((value) => {
      //this.onDrop(value.slice(1));
    });
    _dragulaService.over.subscribe((value) => {
      //this.onOver(value.slice(1));
    });
    _dragulaService.out.subscribe((value) => {
      //this.onOut(value.slice(1));
    });
  }

  public ngOnInit() {
    this.places.forEach((place, index)=>{
       let placeInfo = {} as PlaceInfo;
       placeInfo.places = this.places;
       placeInfo.index = index;
       placeInfo.current = place;
       
       this.placeInfos.push(placeInfo);
    })
  }

  public ngAfterViewInit() {
    $(this._el.nativeElement.ownerDocument).foundation();
  }
  
    
  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
    console.log(args, this.places);
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    // do something else
    console.log(args);
  }
  

}

}