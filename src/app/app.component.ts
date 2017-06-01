import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthService, private router: Router){ }

  title = 'app works!';

  LoggedIn(){
    return this.auth.loggedIn();
  }

  Logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
