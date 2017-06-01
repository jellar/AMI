import { Component, OnInit } from '@angular/core';
import { AuthHttp, JwtHelper} from 'angular2-jwt'; 
import { JwtHttp } from 'angular2-jwt-refresh';
import { QuestionService } from '../dynamic-form/question.service';
import { AuthHttpService} from '../auth/auth-http.service'; 
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers:  [QuestionService]
})

export class HomeComponent implements OnInit{
    companies = [];
    questions: any[];
    jwtHelper = new JwtHelper();
    isCompleted: boolean = false;  
    company:any = { }
    companyScript: string;
    ngOnInit(){

    }

    constructor(  private service: QuestionService
                 ,private authHttpService: AuthHttpService
                 ){ 
        this.getCompanies();
        this.questions = service.getQuestions();
    }

    getCompanies(){
        if (localStorage.getItem('id_token')) {
            // print the decoded JWT token for further development works
            var token = localStorage.getItem('id_token');
                console.log(
                this.jwtHelper.decodeToken(token).userId,
                this.jwtHelper.getTokenExpirationDate(token),
                this.jwtHelper.isTokenExpired(token)
              );            
        }       
         this.authHttpService.get('api/company')
                     .map(response => response.json())
                    .subscribe(
                        data => this.companies = data,
                        error=> console.log(error)
                    );              
    }
    getCompanyScript(id){      
        this.authHttpService.get('api/companyScript/'+ id )
                     .map(response => response.json())
                    .subscribe(
                        data =>  this. companyScript = data,
                        error=> console.log(error)
                    ); 
    }
    onStep1Next(){
        console.log(this.company.id);
        this.getCompanyScript(this.company.id);
    }
    onStep2Next(){
        console.log('step 2');
    }
    onStep3Next(){
        console.log('step 3');
    }
    onComplete(){
        console.log('complete');
        this.isCompleted = true;
    }
}
