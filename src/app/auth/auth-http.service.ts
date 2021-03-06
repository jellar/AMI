import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './auth.service';

import { NgProgressService } from 'ngx-progressbar';

@Injectable()
export class AuthHttpService {

  constructor(private authHttp: AuthHttp,
              private authService: AuthService,
              private router: Router,
              private progress: NgProgressService
              ) { }

  get(endpoint: string) {
    if (this.authService.tokenRequiresRefresh()) {
      this.authService.tokenIsBeingRefreshed.next(true);
      return this.authService.refreshToken().switchMap(
        (data) => {
          this.authService.refreshTokenSuccessHandler(data);
          if (this.authService.loggedIn()) {
            console.log('success - logged in again');
            this.authService.tokenIsBeingRefreshed.next(false);
            return this.getInternal(endpoint);
          } else {
            this.authService.tokenIsBeingRefreshed.next(false);
            this.router.navigate(['/login']);
            return Observable.throw(data);
          }
        }
      ).catch((e) => {
        this.authService.refreshTokenErrorHandler(e);
        return Observable.throw(e);
      });
    }
    else {
       return this.getInternal(endpoint);
    }
  }

  post(endpoint: string, body: string) : Observable<any> {
    if (this.authService.tokenRequiresRefresh()) {
      this.authService.tokenIsBeingRefreshed.next(true);
      return this.authService.refreshToken().switchMap(
        (data) => {
          this.authService.refreshTokenSuccessHandler(data);
          if (this.authService.loggedIn()) {
            this.authService.tokenIsBeingRefreshed.next(false);
            return this.postInternal(endpoint, body);
          } else {
            this.authService.tokenIsBeingRefreshed.next(false);
            this.router.navigate(['/login']);
            return Observable.throw(data);
          }
        }
      ).catch((e) => {
        this.authService.refreshTokenErrorHandler(e);
        return Observable.throw(e);
      });
    }
    else {
      return this.postInternal(endpoint, body);
    }
  }

  private getInternal(endpoint: string) {
    this.progress.start();
    var data = this.authHttp.get(environment.baseApiUrl + endpoint);
    this.progress.done();
    return data;
  }

  private postInternal(endpoint: string, body: string) {
    this.progress.start();
    var data = this.authHttp.post(environment.baseApiUrl + endpoint, body);
    this.progress.done();
    return data;
  }

}
