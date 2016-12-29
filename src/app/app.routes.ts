import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import {InvoiceComponent, InvoiceItemComponent} from './invoice';
import { NoContentComponent } from './no-content';
import {AccountComponent} from './account';
import {LoginComponent} from './login/components/login/';
import {PlaceComponent} from './trip/components/place/';
import {TripComponent} from './trip/components/trip/';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'invoice', component: InvoiceComponent},
  {path: 'account', component: AccountComponent},
  {path: 'login', component: LoginComponent},
  {path: 'place', component: PlaceComponent},
  {path: 'trip', component: TripComponent},
  {path: 'trip/:id/alternative/:uuid', component: TripComponent},
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
      .then((comp: any) => comp.default),
  },
  { path: '**',    component: NoContentComponent },
];
