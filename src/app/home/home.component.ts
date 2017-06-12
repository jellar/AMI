import { Component, OnInit } from '@angular/core';
import { AuthHttp, JwtHelper} from 'angular2-jwt';
import { QuestionService } from '../dynamic-form/question.service';
import { AuthHttpService} from '../auth/auth-http.service';
import { Company } from '../models/company';
import { EmployeeSearch } from '../models/employeeSearch';
import { Employee} from '../models/employee';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers:  [QuestionService],
    styles: [`
        .table tr.active td {
        background-color:#0275d8 !important;
        color: white;
      }
      i.companyid-icon
{
    padding: 5px 10px;
    font-weight:600;
background-color:#f0f0f0;
    display: inline-block;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    -moz-box-shadow: 0px 0px 2px #888;
    -webkit-box-shadow: 0px 0px 2px #888;
    box-shadow: 0px 0px 2px #888;
}
    `]
})

export class HomeComponent implements OnInit{
    companies = [];
    employees = [];
    questions: any[];
    jwtHelper = new JwtHelper();
    isCompleted: boolean = false;
    company:Company = new Company();
    companyScript: string;
    empSearch: EmployeeSearch = new EmployeeSearch();
    selectedRow : Number;
    selectedCompany: number;
    selEmployee: Employee = new Employee();
    ngOnInit(){

    }

    constructor(  private service: QuestionService
                 ,private authHttpService: AuthHttpService
                 , private router: Router
                 , private dataService: DataService
                 ){
        this.getCompanies();
        this.questions = service.getQuestions();
    }

    getCompanies(){
        // if (localStorage.getItem('id_token')) {
        //     // print the decoded JWT token for further development works
        //     let token = localStorage.getItem('id_token');
        //         console.log(
        //         this.jwtHelper.decodeToken(token).userId,
        //         this.jwtHelper.getTokenExpirationDate(token),
        //         this.jwtHelper.isTokenExpired(token)
        //       );
        // }
         this.authHttpService.get('api/company')
                     .map(response => response.json())
                    .subscribe(
                        data => this.companies = data,
                        error => console.log(error)
                    );
    }
    getCompanyScript(id) {
        this.authHttpService.get('api/companyScript/'+ id )
                     .map(response => response.json())
                    .subscribe(
                        data =>  this.companyScript = data,
                        error => console.log(error)
                    );
    }
    getEmployees(id: number, surname: string ){
         this.authHttpService.get('api/employees/'+ id +'/' + surname )
                     .map(response => response.json())
                    .subscribe(
                        data =>  this.employees = data,
                        error => console.log(error)
                    );
    }

    getEmployeeSecurity(id: number){
          this.authHttpService.get('api/employeesecurity/'+ id )
                     .map(response => response.json())
                    .subscribe(
                        data =>  this.selEmployee = data,
                        error=> console.log(error)
                    );
    }
    companyChange(event) {
        this.getCompanyScript(this.company.id);
    }
    onStep1Next(){
        //this.getCompanyScript(this.company.id);
    }
    onStep2Next(){
      this.selectedCompany = this.company.id;
    }
    onStep3Next(){
        this.getEmployees(this.company.id, this.empSearch.employeeSurname);
    }
    onComplete(){
        console.log(this.selEmployee);
        this.isCompleted = true;
        this.dataService.selectedEmployee = this.selEmployee;
        this.router.navigate(['/employee']);
    }
    onStep4Next(){
        this.getEmployeeSecurity(this.selEmployee.employeeId);
    }
    selectedEmployee(index, emp){
        this.selectedRow = index;
        this.selEmployee.employeeId = emp.employeeId;
    }
}
