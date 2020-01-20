import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { Pizza } from 'src/app/shared/pizza.model';
import { NgForm } from '@angular/forms';
import { Base } from 'src/app/shared/base.model';
import { Extra } from 'src/app/shared/extra.model';
import { Size } from 'src/app/shared/size.model';
import { Topping } from 'src/app/shared/topping.model';
import { Combo } from 'src/app/shared/combo.model';
import { PizzaorderComponent } from '../pizzaorder/pizzaorder.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  baseList: Base[];
  extraList: Extra[];
  pizzaList: Pizza[];
  sizeList: Size[];
  toppingList: Topping[];
  comboList: Combo[];

  constructor(
    private Orderservice: OrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.Orderservice.getBaseList().then(res => this.baseList = res as Base[]);
    this.Orderservice.getExtraList().then(res => this.extraList = res as Extra[]);
    this.Orderservice.getPizzaList().then(res => this.pizzaList = res as Pizza[]);
    this.Orderservice.getSizeList().then(res => this.sizeList = res as Size[]);
    this.Orderservice.getToppingList().then(res => this.toppingList = res as Topping[]);
    this.Orderservice.getComboList().then(res => this.comboList = res as Combo[]);
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    // tslint:disable-next-line: no-conditional-assignment
    if (form = null) {
      form.resetForm();
    }

    this.Orderservice.pizzaData = {
      Pizza_ID: 0,
      Pizza_Name: '',
      Pizza_Desc: '',
      Price_ID: 0,
      Price: 0
    };

    this.Orderservice.baseData = {
      Base_ID: 0,
      Base_Type: '',
      Price_ID: 0,
      Price: 0
    };

    this.Orderservice.extraData = {
      Extra_ID: 0,
      Extra_Name: '',
      Price_ID: 0,
      Price: 0
    };

    this.Orderservice.sizeData = {
      Size_ID: 0,
      Size_Desc: '',
      Price_ID: 0,
      Price: 0
    };

    this.Orderservice.toppingData = {
      Topping_ID: 0,
      Topping_Name: '',
      Price_ID: 0,
      Price: 0
    };

    this.Orderservice.comboData = {
      Combo_ID: 0,
      Combo_Name: '',
      Combo_Price: 0,
      Pizza_ID: 0,
      Pizza_Name: '',
      Size_ID: 0,
      Size_Desc: '',
      Base_ID: 0,
      Base_Type: '',
      Extra_ID: 0,
      Extra_Name: ''
    };
    // this.o.exerciseplanday = [];
  }

  CreatePizzaOrder(Pizza_ID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { Pizza_ID };
    this.dialog.open(PizzaorderComponent, dialogConfig);
  }
}
