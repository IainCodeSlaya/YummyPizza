import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/shared/order.service';
import { Base } from 'src/app/shared/base.model';
import { Size } from 'src/app/shared/size.model';
import { Indpizza } from 'src/app/shared/indpizza.model';

@Component({
  selector: 'app-pizzaorder',
  templateUrl: './pizzaorder.component.html',
  styleUrls: ['./pizzaorder.component.scss']
})
export class PizzaorderComponent implements OnInit {
  baseList: Base[];
  sizeList: Size[];
  indPizzaList: Indpizza[];
  isValid: Boolean = true;
  x: number;
  y: number;
  a: number;
  b: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PizzaorderComponent>,
    private oService: OrderService,
    private dialog: MatDialog) { }

  ngOnInit() {
    // this.oService.getSelectedPizza(this.oService.pizzaIndex).then(res => this.indPizzaList = res as Indpizza[]);
    this.oService.getBaseList().then(res => this.baseList = res as Base[]);
    this.oService.getSizeList().then(res => this.sizeList = res as Size[]);

    this.oService.baseData = {
      Base_ID: 0,
      Base_Type: '',
      Price_ID: 0,
      Price: 0
    };

    this.oService.sizeData = {
      Size_ID: 0,
      Size_Desc: '',
      Price_ID: 0,
      Price: 0
    };

    this.oService.indPizzaData = {
      Pizza_ID: 0,
      Pizza_Name: '',
      Pizza_Desc: ''
    };

    this.oService.finalPizzaPrice = this.oService.pizzaPrice;
    this.x = 0;
    this.y = 0;
    this.a = 0;
    this.b = 0;
    // this.resetItem();
  }

  AddBase(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.oService.baseData.Price = 0;
    } else {
      this.oService.baseData.Price = this.baseList[ctrl.selectedIndex - 1].Price;
      this.y = this.oService.baseData.Price;
      this.oService.finalPizzaPrice = this.oService.finalPizzaPrice - this.x + this.y;
      this.x = this.y;
    }
  }

  AddSize(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.oService.sizeData.Price = 0;
    } else {
      this.oService.sizeData.Price = this.sizeList[ctrl.selectedIndex - 1].Price;
      this.b = this.oService.sizeData.Price;
      this.oService.finalPizzaPrice = this.oService.finalPizzaPrice - this.a + this.b;
      this.a = this.b;
    }
  }

  AddPizzaItem() {
    if (this.validateForm(this.oService.baseData, this.oService.sizeData)) {
      this.oService.finalPrice = this.oService.finalPrice + this.oService.finalPizzaPrice;
      this.oService.orderData.OTotal = this.oService.orderData.OTotal + this.oService.finalPrice;
      this.oService.orderItemsList.push(this.oService.orderItemData);
      this.dialogRef.close();
      console.log(this.oService.finalPrice, this.oService.finalPizzaPrice);
      this.oService.finalPizzaPrice = 0;
      this.oService.finalPrice = 0;
    }
  }

  resetItem() {
    this.oService.orderItemData = {
      OrderItem_ID: null,
      Order_ID: null,
      Topping_ID: null,
      Pizza_ID: null,
      Size_ID: null,
      Base_ID: null,
      Extra_ID: null,
      Combo_ID: null,
      Order_Quantity: 0
    };
  }

  validateForm(baseData: Base, sizeData: Size) {
    this.isValid = true;
    if (baseData.Base_ID === 0) {
      this.isValid = false;
    } else if (sizeData.Size_ID === 0) {
      this.isValid = false;
    }
    // this.epObj.Exercise_Plan_ID = this.service.formData.Exercise_Plan_ID;
    // this.epObj.Exercise_Plan_Name = this.service.formData.Exercise_Plan_Name;
    return this.isValid;
  }
}
