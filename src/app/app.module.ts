import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';


import {DragulaModule} from 'ng2-dragula';
import {ResizableModule} from 'angular-resizable-element';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import {InvoiceComponent, InvoiceItemComponent, INVOICE_COMPONENTS} from './invoice';
import {AccountComponent} from './account';
import { NoContentComponent } from './no-content';
import { XLarge } from './home/x-large';

import {LoginComponent} from './login/components/login/';
import {PlaceComponent} from './trip/components/place/';
import {TripComponent} from './trip/components/trip/';
import {TripListComponent} from './trip/components/list/';
import {TimelineViewComponent} from './trip/view.components/timeline/';
import {PhotosInfoViewComponent} from './trip/view.components/photos-info/';
import {MoveInfoViewComponent} from './trip/view.components/move-info/';
import {PlaceInfoViewComponent} from './trip/view.components/place-info/';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import {SharedModule} from './shared/';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { GMapsService } from './shared/services/gmaps.service';

import {TripService} from './trip/services/trip.services'

import { Ng2CloudinaryModule } from 'ng2-cloudinary';

import { MyDatePickerModule } from 'mydatepicker';

import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';



// https://maps.googleapis.com/maps/api/staticmap?size=1400x1400&path=weight:3|color:orange|enc:polyline_data&key=AIzaSyD7SD0fOQEgd2o7M0TNBz7bs2UMbEJLJ3g

const PLACE_VIEWS = [
  TimelineViewComponent,
  MoveInfoViewComponent,
  PlaceInfoViewComponent,
  PhotosInfoViewComponent
]


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    PlaceComponent,
    TripComponent,
    TripListComponent,
    ...PLACE_VIEWS,
    ...INVOICE_COMPONENTS,
    AccountComponent,
    NoContentComponent,
    LoginComponent,
    XLarge
  ],
  imports: [ // import Angular's modules

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBz-SSRjmp0v2Rfymw9xDm-WXYWbABcZ7M',
      language:'en',
      libraries: ['places']
    }),

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    ModalModule.forRoot(),
    BootstrapModalModule,
    //wjNg2Grid,
    Ng2BootstrapModule,
    DragulaModule,
    ResizableModule,
    SharedModule,

    Ng2CloudinaryModule,

    MyDatePickerModule,

    MultiselectDropdownModule
    
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    GMapsService,
    TripService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

