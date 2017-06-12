import { Injectable } from '@angular/core'; 
import { Employee } from './models/employee';

@Injectable()
export class DataService{
    constructor() {      
        
    }
    public selectedEmployee: Employee;

}