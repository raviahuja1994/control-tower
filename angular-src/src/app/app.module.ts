import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule, Routes} from '@angular/router'
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {FlashMessagesModule} from 'angular2-flash-messages';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service'
import {AuthGuard} from './guards/auth.guard';
import { GooglemapComponent } from './components/googlemap/googlemap.component';
import { TestComponent } from './components/test/test.component';
import { GoogletrackComponent } from './components/googletrack/googletrack.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {MapService} from "./services/map.service";

const appRoutes: Routes = [
  {path:'', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'googlemap', component: GooglemapComponent, canActivate:[AuthGuard]},
  {path:'test', component: TestComponent, canActivate:[AuthGuard]},
  {path:'googletrack', component: GoogletrackComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    GooglemapComponent,
    TestComponent,
    GoogletrackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    Ng2SmartTableModule,
    DataTableModule,
    SharedModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
