
import {NgModule} from '@angular/core'
import { HttpModule, Http, XHRBackend, Headers, Response, ConnectionBackend, RequestOptions, RequestOptionsArgs } from "@angular/http"
import { CommonModule } from '@angular/common';
import { RouterModule, PreloadAllModules } from '@angular/router';

import {ALL_SHARED_SERVICES} from './services';
import {ALL_SHARED_COMPONENTS} from './components';
import {ALL_SHARED_PIPES} from './pipes';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    ...ALL_SHARED_COMPONENTS,
    ...ALL_SHARED_PIPES
  ],
  providers: [
    ...ALL_SHARED_SERVICES

  ],
  exports: [
    ...ALL_SHARED_COMPONENTS,
    ...ALL_SHARED_PIPES
  ]
})
export class SharedModule {

}