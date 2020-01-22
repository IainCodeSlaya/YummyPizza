import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ThrowStmt } from '@angular/compiler';

export interface Quantity {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-selectquantity',
  templateUrl: './selectquantity.component.html',
  styleUrls: ['./selectquantity.component.scss']
})
export class SelectquantityComponent implements OnInit {
  numbers: Quantity[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
    {value: 8, viewValue: '8'},
    {value: 9, viewValue: '9'},
    {value: 10, viewValue: '10'}
  ];

  isValid: Boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SelectquantityComponent>,
    private oService: OrderService,
    private dialog: MatDialog ) { }

  ngOnInit() {
    this.oService.quantity = 0;
  }

  updateQuantity() {
    const ola = (document.getElementById('qtys') as HTMLSelectElement).selectedIndex;
    this.oService.quantity = this.numbers[ola].value;
  }

  saveQuantity() {
    const ola = (document.getElementById('qtys') as HTMLSelectElement).selectedIndex;
    this.validateForm(ola);
    if (this.data.qt === 'Extra') {
      this.oService.orderItemData.Order_Quantity = ola;
    } else if (this.data.qt === 'Combo') {
      this.oService.orderItemData.Order_Quantity = ola;
    }
    this.oService.orderData.OTotal = this.oService.orderData.OTotal + (ola * this.oService.qtyPrice);
    this.oService.orderItemsList.push(this.oService.orderItemData);
    console.log('oItem', this.oService.orderItemData);
    // console.log('p before', this.oService.qtyPrice);
    this.oService.qtyPrice = 0;
    this.oService.quantity = 0;
    console.log('oItem', this.oService.orderItemsList);
    this.dialogRef.close();
    // console.log('p after', this.oService.qtyPrice);
    console.log('orderdata', this.oService.orderData);
  }

  validateForm(ola: number) {
    this.isValid = true;
    if (ola === 0) {
      this.isValid = false;
    } else if ( this.oService.quantity === 0) {
      this.isValid = false;
    }
    return this.isValid;
  }

}
