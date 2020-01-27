import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

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
    {value: 10, viewValue: '10'},
    {value: 11, viewValue: '11'},
    {value: 12, viewValue: '12'},
    {value: 13, viewValue: '13'},
    {value: 14, viewValue: '14'},
    {value: 15, viewValue: '15'},
    {value: 16, viewValue: '16'},
    {value: 17, viewValue: '17'},
    {value: 18, viewValue: '18'},
    {value: 19, viewValue: '19'},
    {value: 20, viewValue: '20'},
    {value: 21, viewValue: '21'},
    {value: 22, viewValue: '22'},
    {value: 23, viewValue: '23'},
    {value: 24, viewValue: '24'},
    {value: 25, viewValue: '25'},
    {value: 26, viewValue: '26'},
    {value: 27, viewValue: '27'},
    {value: 28, viewValue: '28'},
    {value: 29, viewValue: '29'},
    {value: 30, viewValue: '30'}
  ];

  isValid: Boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SelectquantityComponent>,
    private oService: OrderService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.oService.quantity = 0;
  }

  updateQuantity() {
    const ola = (document.getElementById('qtys') as HTMLSelectElement).selectedIndex;
    this.oService.quantity = this.numbers[ola].value;
  }

  saveQuantity() {
    let q: number;
    const ola = (document.getElementById('qtys') as HTMLSelectElement).selectedIndex;
    this.validateForm(ola);

    if (this.data.qt === 'Extra') {
      this.oService.orderItemData.Order_Quantity = ola;
    } else if (this.data.qt === 'Combo') {
      this.oService.orderItemData.Order_Quantity = ola;
    }

    q = ola * this.oService.qtyPrice;
    this.oService.orderData.OTotal = this.oService.orderData.OTotal + q;
    this.oService.orderItemsList.push(this.oService.orderItemData);

    this.oService.itemData.Quantity = ola;
    this.oService.itemData.Total = q;
    this.oService.itemList.push(this.oService.itemData);

    this.oService.qtyPrice = 0;
    this.oService.quantity = 0;
    q = 0;
    this.dialogRef.close();

    if (this.data.qt === 'Extra') {
      if (ola === 1) {
        this.toastr.success('Extra Successfully Added to Order', 'Yummy Pizza');
      } else {
        this.toastr.success(ola.toString() + ' Extras Successfully Added to Order', 'Yummy Pizza');
      }
    } else if (this.data.qt === 'Combo') {
      if (ola === 1) {
        this.toastr.success('Combo Successfully Added to Order', 'Yummy Pizza');
      } else {
        this.toastr.success(ola.toString() + ' Comboes Successfully Added to Order', 'Yummy Pizza');
      }
    }
    // console.log(this.oService.orderItemsList, 'orderitemlist');
    // console.log(this.oService.itemList, 'itemlist');
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
