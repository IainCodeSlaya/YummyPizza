import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pizza } from './pizza.model';
import { Base } from './base.model';
import { Extra } from './extra.model';
import { Size } from './size.model';
import { Topping } from './topping.model';
import { Combo } from './combo.model';
import { Indpizza } from './indpizza.model';
import { Order } from './order.model';
import { Orderstatus } from './orderstatus.model';
import { Ordertype } from './ordertype.model';
import { Orderitem } from './orderitem.model';
import { Vat } from './vat.model';
import { Pmethod } from './pmethod.model';
import { Invoice } from './invoice.model';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseData: Base;
  extraData: Extra;
  pizzaData: Pizza;
  sizeData: Size;
  toppingData: Topping;
  comboData: Combo;
  indPizzaData: Indpizza;
  finalPrice: number;
  pizzaIndex: number;
  pizzaName: string;
  pizzaPrice: number;
  pizzaID: number;
  finalPizzaPrice: number;
  orderData: Order;
  orderstatusData: Orderstatus;
  ordertypeData: Ordertype;
  orderItemsList: Orderitem[];
  orderItemData: Orderitem;
  quantity: number;
  qtyPrice: number;
  vatData: Vat;
  pmethodData: Pmethod;
  invoiceData: Invoice;
  orderID: number;
  cancelled: boolean;
  itemList: Item[];
  itemData: Item;

  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    var body = {
      ...this.orderData,
      OrderItems: this.orderItemsList
    };
    return this.http.post(environment.apiURL + '/Orders', body);
  }

  getOrderStasusList() {
    return this.http.get(environment.apiURL + '/OrderStatus').toPromise();
  }

  getOrderTypeList() {
    return this.http.get(environment.apiURL + '/OrderType').toPromise();
  }

  getBaseList() {
    return this.http.get(environment.apiURL + '/Bases').toPromise();
  }

  getExtraList() {
    return this.http.get(environment.apiURL + '/Extras').toPromise();
  }

  getPizzaList() {
    return this.http.get(environment.apiURL + '/Pizzas').toPromise();
  }

  getSizeList() {
    return this.http.get(environment.apiURL + '/Sizes').toPromise();
  }

  getToppingList() {
    return this.http.get(environment.apiURL + '/Toppings').toPromise();
  }

  getComboList() {
    return this.http.get(environment.apiURL + '/Comboes').toPromise();
  }

  getSelectedPizza(pizzaID: number) {
    return this.http.get(environment.apiURL + '/Pizzas/' + pizzaID).toPromise();
  }

  getVATList() {
    return this.http.get(environment.apiURL + '/VATs').toPromise();
  }

  getPMethodList() {
    return this.http.get(environment.apiURL + '/PMethods').toPromise();
  }

  getInvoicesList() {
    return this.http.get(environment.apiURL + '/Invoices').toPromise();
  }

  saveInvoice(body: Invoice) {
    return this.http.post(environment.apiURL + '/Invoices', body);
  }

  deleteOrder(id: number) {
    return this.http.delete(environment.apiURL + '/Orders/' + id).toPromise();
  }
}
