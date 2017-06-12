import { Component, OnInit , Input } from '@angular/core';
import { Employee } from '../models/employee'
import { DataService} from '../data.service'; 

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html'   
})

export class EmployeeComponent implements OnInit {
    employeeInput: Employee   
    constructor(private dataService:DataService) {
                
    }
     ngOnInit(){       
        console.log(this.dataService.selectedEmployee);
    }


}