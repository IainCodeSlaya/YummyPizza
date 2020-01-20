import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { OrderComponent } from './orders/order/order.component';
import { Pizza } from './shared/pizza.model';
import { OrderService } from './shared/order.service';
import { PizzaorderComponent } from './orders/pizzaorder/pizzaorder.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    OrdersComponent,
    OrderItemsComponent,
    PizzaorderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [PizzaorderComponent],
  providers: [OrderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
