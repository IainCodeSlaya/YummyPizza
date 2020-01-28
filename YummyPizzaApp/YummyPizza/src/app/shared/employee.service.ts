import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  employeeList: Employee[];

  constructor(private http: HttpClient) { }

  postEmployees(Data: Employee) {
    return this.http.post(environment.apiURL + '/Employees', Data);
  }
  refreshList() {
    return this.http.get(environment.apiURL + '/Employees').toPromise();
  }

  putEmployee(formData: Employee) {
    return this.http.put(environment.apiURL + '/Employees/' + formData.Employee_ID, formData);
  }

  deleteEmployee(id: number){
    return this.http.delete(environment.apiURL + '/Employees/' + id);
  }
}
