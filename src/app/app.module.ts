import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule,Http, RequestOptions, Response } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth} from 'angular2-jwt';
//import {  AuthConfig } from 'angular2-jwt';
import { JwtConfigService, JwtHttp } from 'angular2-jwt-refresh';

/** routes */
import { routing } from './app.routing';

/**auth */
import { AuthGuard } from './auth/auth.guard';
import { AuthService} from './auth/auth.service'; 
import { AuthHttpService} from './auth/auth-http.service'; 

import { AppComponent } from './app.component';
import { HomeComponent} from './home/home.component';
import { LoginComponent} from './login/login.component';


import { DynamicFormComponent }         from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question.component';
import { FormWizardModule } from './wizard/form-wizard-module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DynamicFormComponent, DynamicFormQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    routing,
    FormWizardModule
  ],
  providers: [                 
               AuthGuard ,              
               AuthHttp,
               AuthService,
               AuthHttpService,
               provideAuth({
                        headerName: 'Authorization',
                        headerPrefix: 'bearer',
                        tokenName: 'token',
                        tokenGetter: () => localStorage.getItem('id_token'),
                        globalHeaders: [{ 'Content-Type': 'application/json' }],
                        noJwtError: true
                    })],  
  bootstrap: [AppComponent]
})
export class AppModule { }