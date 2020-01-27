import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/shared/order.service';
import { Base } from 'src/app/shared/base.model';
import { Size } from 'src/app/shared/size.model';
import { Indpizza } from 'src/app/shared/indpizza.model';
import { ToastrService } from 'ngx-toastr';
import { Topping } from 'src/app/shared/topping.model';

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
  size: string;
  base: string;
  toppingList: Topping[];
  sbool: boolean;
  bbool: boolean;
  sID: number;
  bID: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PizzaorderComponent>,
    private oService: OrderService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.oService.getToppingList().then(res => this.toppingList = res as Topping[]);
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
    this.base = '';
    this.size = '';
    this.bbool = false;
    this.sbool = false;
    this.bID = 0;
    this.sID = 0;
    // this.resetItem();
  }

  AddBase(ctrl) {
    this.base = '';
    this.bbool = false;
    this.bID = 0;
    if (ctrl.selectedIndex === 0) {
      this.oService.baseData.Price = 0;
      this.bbool = false;
      this.pizzaConfig();
    } else {
      this.oService.baseData.Price = this.baseList[ctrl.selectedIndex - 1].Price;
      this.y = this.oService.baseData.Price;
      this.oService.finalPizzaPrice = this.oService.finalPizzaPrice - this.x + this.y;
      this.x = this.y;
      this.bID = this.baseList[ctrl.selectedIndex - 1].Base_ID;
      this.base = this.baseList[ctrl.selectedIndex - 1].Base_Type;
      this.bbool = true;
      this.pizzaConfig();
    }
  }

  AddSize(ctrl) {
    this.size = '';
    this.sbool = false;
    this.sID = 0;
    if (ctrl.selectedIndex === 0) {
      this.oService.sizeData.Price = 0;
      this.sbool = false;
      this.pizzaConfig();
    } else {
      this.oService.sizeData.Price = this.sizeList[ctrl.selectedIndex - 1].Price;
      this.b = this.oService.sizeData.Price;
      this.oService.finalPizzaPrice = this.oService.finalPizzaPrice - this.a + this.b;
      this.a = this.b;
      this.sID = this.sizeList[ctrl.selectedIndex - 1].Size_ID;
      this.size = this.sizeList[ctrl.selectedIndex - 1].Size_Desc;
      this.sbool = true;
      this.pizzaConfig();
    }
  }

  pizzaConfig() {
    let sbd = document.getElementById('sbd') as HTMLDivElement;
    let ssd = document.getElementById('ssd') as HTMLDivElement;
    let h6l = document.getElementById('h6l') as HTMLDivElement;
    let ttopping = document.getElementById('ttopping') as HTMLTableElement;

    if (this.bbool && this.sbool === true) {
      ttopping.hidden = false;
      h6l.hidden = false;
    } else {
      ttopping.hidden = true;
      h6l.hidden = true;
    }
  }

  AddPizzaItem() {
    this.resetItem();
    if (this.validateForm(this.oService.baseData, this.oService.sizeData)) {
      this.oService.finalPrice = this.oService.finalPrice + this.oService.finalPizzaPrice;
      this.oService.orderData.OTotal = this.oService.orderData.OTotal + this.oService.finalPrice;
      this.oService.orderItemData.Order_Quantity = 1;
      this.oService.orderItemData.Pizza_ID = this.oService.pizzaID;
      this.oService.orderItemData.Base_ID = this.bID;
      this.oService.orderItemData.Size_ID = this.sID;
      this.oService.orderItemsList.push(this.oService.orderItemData);

      this.oService.itemData.Price = this.oService.finalPrice;
      this.oService.itemData.Total = this.oService.finalPrice;
      this.oService.itemData.Item = this.oService.pizzaName + ' ' + this.base + ' ' + this.size;
      this.oService.itemData.Quantity = 1;
      this.oService.itemList.push(this.oService.itemData);

      this.toastr.success(this.oService.pizzaName + ' Pizza Successfully Added to Order', 'Yummy Pizza');
      this.dialogRef.close();
      this.oService.finalPizzaPrice = 0;
      this.oService.finalPrice = 0;
      this.oService.pizzaName = '';
    }
  }

  updatePrice(x: number) {
    this.oService.orderData.OTotal = this.oService.orderData.OTotal + x;
  }

  AddToppingToOrder(j, OrderID) {
    let t: number;
    t = 0;
    this.resetItem();

    this.oService.orderItemData.Order_ID = OrderID;
    this.oService.orderItemData.Topping_ID = this.toppingList[j].Topping_ID;
    this.updatePrice(this.toppingList[j].Price);
    this.oService.orderItemData.Order_Quantity = 1;
    this.oService.orderItemsList.push(this.oService.orderItemData);

    this.oService.itemData.Item = this.toppingList[j].Topping_Name;
    this.oService.itemData.Price = this.toppingList[j].Price;
    this.oService.itemData.Quantity = this.oService.orderItemData.Order_Quantity;
    t = this.oService.itemData.Price * this.oService.itemData.Quantity;
    this.oService.itemData.Total = t;
    this.oService.itemList.push(this.oService.itemData);

    // this.oService.finalPizzaPrice = this.oService.finalPizzaPrice + this.toppingList[j].Price;
    this.toastr.success(this.toppingList[j].Topping_Name + ' Successfully Added to Pizza', 'Yummy Pizza');
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

    this.oService.itemData = {
      Item: '',
      Price: 0,
      Quantity: 0,
      Total: 0
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
