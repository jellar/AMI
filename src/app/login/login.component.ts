import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService} from '../auth/auth.service'; 

@Component({
    selector:'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{
    model: any = {};
    error = '';
    loading = false; 

    constructor(  private router: Router
                 ,private authService: AuthService
                 ){

    }

    ngOnInit(){
        // reset login status
        this.authService.logout();
    }

    login(){
        this.loading = true;        
        this.authService.login(this.model.username, this.model.password)
                 .subscribe(result => {
                    console.log(result);
                    if(result === true){
                        this.router.navigate(['/']);
                    }
                    else{
                        this.error = 'username or password is incorrect';
                          this.loading = false;
                    }
                });
    }
}