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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PizzaorderComponent>,
    private oService: OrderService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.oService.getSelectedPizza(this.data.Pizze_ID).then(res => this.indPizzaList = res as Indpizza[]);
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
  }

}
