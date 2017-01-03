import { Injectable } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, Response, ConnectionBackend, RequestOptions, RequestOptionsArgs } from "@angular/http"

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { EviHttpService } from './evi.http.service'
import { SettingsService } from './settings.service';

import * as _lodash from 'lodash';
import * as _moment from 'moment';
import * as _numeral from 'numeral';

@Injectable()
export class EviService {
  
  public _ = _lodash;
  public moment = _moment;
  public numeral = _numeral;

  constructor(public http: EviHttpService, public modal: Modal, public settings : SettingsService, public router: Router ) {

  }

  navigate(params){
    this.router.navigate(params);
  }

}
