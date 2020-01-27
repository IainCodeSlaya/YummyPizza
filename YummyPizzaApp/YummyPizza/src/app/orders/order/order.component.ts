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
import { Ordertype } from 'src/app/shared/ordertype.model';
import { Orderstatus } from 'src/app/shared/orderstatus.model';
import { SelectquantityComponent } from '../selectquantity/selectquantity.component';
import { Returnorder } from 'src/app/shared/returnorder.model';
import { InvoicesComponent } from '../invoices/invoices.component';

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
  odTypeList: Ordertype[];
  odStatusList: Orderstatus[];
  quantityType: string;
  isValid: Boolean = true;
  rOrder: Returnorder;

  constructor(
    private Orderservice: OrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.Orderservice.getOrderStasusList().then(res => this.odStatusList = res as Orderstatus[]);
    this.Orderservice.getOrderTypeList().then(res => this.odTypeList = res as Ordertype[]);
    this.Orderservice.getBaseList().then(res => this.baseList = res as Base[]);
    this.Orderservice.getExtraList().then(res => this.extraList = res as Extra[]);
    this.Orderservice.getPizzaList().then(res => this.pizzaList = res as Pizza[]);
    this.Orderservice.getSizeList().then(res => this.sizeList = res as Size[]);
    this.Orderservice.getToppingList().then(res => this.toppingList = res as Topping[]);
    this.Orderservice.getComboList().then(res => this.comboList = res as Combo[]);
    this.resetForm();
  }

  resetForm() {
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

    this.Orderservice.orderData = {
      Order_ID: null,
      Order_No: Math.floor(100000 + Math.random() * 900000),
      Order_Status_ID: 4,
      Status: 'Started',
      Order_Type_ID: 0,
      Order_Type: '',
      Order_Date: this.getDate(),
      OTotal: 0,
      Emp_Shift_ID: 1,
      User_ID: 1
    };

    this.rOrder = {
      Order_ID: 0,
      Order_No: 0,
      Order_Status_ID: 0,
      Order_Type_ID: 0,
      Order_Date: '',
      OTotal: 0,
      Emp_Shift_ID: 0,
      User_ID: 0,
      Employee_Shift: null,
      Invoices: [],
      Order_Status: null,
      Order_Type: null,
      User: null,
      OrderItems: []
    };

    this.Orderservice.finalPrice = 0;
    this.Orderservice.pizzaIndex = 0;
    this.Orderservice.pizzaName = '';
    this.Orderservice.pizzaPrice = 0;
    this.Orderservice.finalPizzaPrice = 0;
    this.quantityType = '';
    this.Orderservice.qtyPrice = 0;
    this.Orderservice.orderItemsList = [];
    this.Orderservice.orderID = 0;
    this.Orderservice.quantity = 0;
    this.Orderservice.cancelled = false;

    this.resetItem();

    this.Orderservice.invoiceData = {
      Invoice_ID: null,
      Subtotal: 0,
      Amount_Tendered: 0,
      Change: 0,
      VAT_ID: 0,
      Vat_Percent: 0,
      Order_ID: 0,
      PMethod_ID: 0,
      PMethod_Descr: '',
      Invoice_Total: 0
    };
  }

  resetItem() {
    this.Orderservice.orderItemData = {
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

  getDate() {
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    return(utc);
  }

  selectOrderType(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.Orderservice.orderData.Order_Type = '';
    } else {
      this.Orderservice.orderData.Order_Type = this.odTypeList[ctrl.selectedIndex - 1].Order_Type1;
    }
    console.log(this.Orderservice.orderData);
  }

  AddToppingToOrder(j, OrderID) {
    this.resetItem();
    this.Orderservice.orderItemData.Order_ID = OrderID;
    this.Orderservice.orderItemData.Topping_ID = this.toppingList[j].Topping_ID;
    this.updatePrice(this.toppingList[j].Price);
    this.Orderservice.orderItemData.Order_Quantity = 1;
    this.Orderservice.orderItemsList.push(this.Orderservice.orderItemData);
    // console.log('oItem', this.Orderservice.orderItemData);
    // console.log('orderdata', this.Orderservice.orderData);
  }

  AddExtraToOrder(k, OrderID) {
    this.resetItem();
    // console.log(k, OrderID);

    this.Orderservice.orderItemData.Order_ID = OrderID;
    this.Orderservice.orderItemData.Extra_ID = this.extraList[k].Extra_ID;
    this.quantityType = 'Extra';
    let qt = this.quantityType;
    this.Orderservice.qtyPrice = this.extraList[k].Price;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.data = { k, qt };
    this.dialog.open(SelectquantityComponent, dialogConfig);
  }

  AddComboToOrder(l, OrderID) {
    this.resetItem();
    // console.log(l, OrderID);

    this.Orderservice.orderItemData.Order_ID = OrderID;
    this.Orderservice.orderItemData.Combo_ID = this.comboList[l].Combo_ID;
    this.quantityType = 'Combo';
    let qt = this.quantityType;
    this.Orderservice.qtyPrice = this.comboList[l].Combo_Price;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.data = { l, qt };
    this.dialog.open(SelectquantityComponent, dialogConfig);
  }

  CreatePizzaOrder(i) {
    this.resetItem();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { i };

    this.Orderservice.pizzaIndex = i;
    this.Orderservice.pizzaName = this.pizzaList[this.Orderservice.pizzaIndex].Pizza_Name;
    this.Orderservice.pizzaPrice = this.pizzaList[this.Orderservice.pizzaIndex].Price;
    this.Orderservice.orderItemData.Pizza_ID = this.pizzaList[i].Pizza_ID;
    this.Orderservice.orderItemData.Order_Quantity = 1;

    this.dialog.open(PizzaorderComponent, dialogConfig);
  }

  updatePrice(x: number) {
    this.Orderservice.orderData.OTotal = this.Orderservice.orderData.OTotal + x;
    // console.log(this.Orderservice.orderData.OTotal);
  }

  startNewOrder() {
    if (this.validateForm()) {
      this.Orderservice.saveOrUpdateOrder().subscribe(res => {
        this.Orderservice.orderID = res as number;
      });

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "70%";
      dialogConfig.data = { };
      this.dialog.open(InvoicesComponent, dialogConfig).afterClosed().subscribe(res => {
        this.resetForm();
      });
    }
  }

  validateForm() {
    this.isValid = true;
    if (this.Orderservice.orderData.Order_Type_ID === 0) {
      this.isValid = false;
    }
    return this.isValid;
  }
}
