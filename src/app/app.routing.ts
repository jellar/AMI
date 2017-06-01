import { RouterModule} from '@angular/router';
import { LoginComponent} from './login/login.component';
import { HomeComponent} from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

export const routing = RouterModule.forRoot([    
    {   
    path: 'login',
    component: LoginComponent
    },
    {   
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
    },
    {   
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
    }
]);