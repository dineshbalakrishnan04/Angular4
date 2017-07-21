import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }   from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { DashboardModule }   from './dashboard/dashboard.Module';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [LoginService, DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

