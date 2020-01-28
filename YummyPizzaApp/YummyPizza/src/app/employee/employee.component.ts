import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeList: Employee[];

  /*configure the grid
  columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Surname', field: ''},
    {headerName: 'IDNumber', field: ''},
    {headerName: 'EmployeeID', field: 0},
  ];

  rowData = [
    { Name:'There ', Surname:'should', IDNumber:'be something', EmployeeID: 0},
    { Name:'There ', Surname:'should', IDNumber:'be something', EmployeeID: 0},
    { Name:'There ', Surname:'should', IDNumber:'be something', EmployeeID: 0},
    { Name:'There ', Surname:'should', IDNumber:'be something', EmployeeID: 0},
    { Name:'There ', Surname:'should', IDNumber:'be something', EmployeeID: 0}
  ]
*/
  constructor(private service: EmployeeService,
              private toastr: ToastrService,
              private router: Router,
              private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.resetForm();
    this.refreshList();
  }

  refreshList() {
    this.service.refreshList().then(res => this.employeeList = res as Employee[]);
  }

  resetForm() {
    this.service.formData = {
      Employee_ID: 0,
      Emp_Name: '',
      Emp_Address: '',
      Emp_Contact: '',
      Emp_Email: '',
      Emp_ID_Number: 0,
      Emp_Surname: '',
      Emp_Type_ID: 1,
      Gender_ID: 2,
      User_ID: 1
    };
  }
  test() {
    console.log(this.service.formData);
    this.service.postEmployees(this.service.formData).subscribe(res => {
      console.log(res, 'P');
      this.resetForm();
    });
  }

 onSubmit(form: NgForm) {
    if (this.service.formData.Employee_ID === 0 ) {
      this.insertRecord(this.service.formData);
    } else {
      this.updateRecord(this.service.formData);
    }
  }
  insertRecord(form: Employee) {
    this.service.postEmployees(form).subscribe(res => {
      this.toastr.success('inserted successfully!', 'Emp register');
      console.log(res, 'DoreenTests');
      this.resetForm();
      this.refreshList();
    });
  }
  updateRecord(form: Employee) {
    this.service.putEmployee(this.service.formData).subscribe(res => {
      this.toastr.info('Updated successfully', 'EMP.Register');
      console.log(res, 'DoreenTestsUpdate');
      this.resetForm();
      this.refreshList();
    });
  }

  populateForm(emp: Employee){
    this.service.formData = Object.assign({}, emp);
  }

  newRoute() {
    this.router.navigate(['/order']);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
        this.service.deleteEmployee(id).subscribe(res => {
          console.log(res, 'DoreenTestsDelete');
          this.refreshList();
          this.resetForm();
          this.toastr.warning('Deleted successfully', 'EMP. Register');
        });
      }
    }
}

