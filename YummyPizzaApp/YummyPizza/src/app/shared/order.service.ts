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

  constructor(private http: HttpClient) { }

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

  getSelectedPizza(pizzaID) {
    return this.http.get(environment.apiURL + '/Pizzas/' + pizzaID).toPromise();
  }
}
