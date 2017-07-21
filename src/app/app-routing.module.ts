import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
  	 path: 'dashboard',  component: DashboardComponent
  },
  {
	 path: 'logout',  component: LoginComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}