import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule,Http, RequestOptions, Response } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth} from 'angular2-jwt';


/** routes */
import { routing } from './app.routing';

/**auth */
import { AuthGuard } from './auth/auth.guard';
import { AuthService} from './auth/auth.service';
import { AuthHttpService} from './auth/auth-http.service';

import { AppComponent } from './app.component';
import { HomeComponent} from './home/home.component';
import { EmployeeComponent} from './employee/employee.component';
import { LoginComponent} from './login/login.component';
import { WelcomeScriptComponent } from './home/components/welcome-script.component';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question.component';
import { FormWizardModule } from './wizard/form-wizard-module';

import { NgProgressModule  } from 'ngx-progressbar';
import { Ng2PaginationModule } from 'ng2-pagination';
import { DataService} from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DynamicFormComponent, DynamicFormQuestionComponent,
    EmployeeComponent,
    WelcomeScriptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    routing,
    FormWizardModule,
    NgProgressModule,
    Ng2PaginationModule
  ],
  providers: [
               AuthGuard ,
               AuthHttp,
               AuthService,
               AuthHttpService,
               DataService,
               provideAuth({
                        headerName: 'Authorization',
                        headerPrefix: 'bearer',
                        tokenName: 'token',
                        tokenGetter: () => localStorage.getItem('id_token'),
                        globalHeaders: [{ 'Content-Type': 'application/json' }],
                        noJwtError: true
                    }),
                  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
