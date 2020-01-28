import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { OrderComponent } from './orders/order/order.component';
import { Pizza } from './shared/pizza.model';
import { OrderService } from './shared/order.service';
import { PizzaorderComponent } from './orders/pizzaorder/pizzaorder.component';
import { SelectquantityComponent } from './orders/selectquantity/selectquantity.component';
import { InvoicesComponent } from './orders/invoices/invoices.component';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    OrdersComponent,
    OrderItemsComponent,
    PizzaorderComponent,
    SelectquantityComponent,
    InvoicesComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [PizzaorderComponent, SelectquantityComponent, InvoicesComponent],
  providers: [OrderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
