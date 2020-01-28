import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {path: '', redirectTo: 'employee', pathMatch: 'full'},
  {path: 'employee', component: EmployeeComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'order', children: [
    {path: '', component: OrderComponent},
    {path: 'edit/id', component: OrderComponent}
  ] },
 // {path: 'order-items', component: OrdersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
