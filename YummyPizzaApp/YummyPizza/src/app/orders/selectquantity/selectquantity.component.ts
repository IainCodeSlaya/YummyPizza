import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  updateQuantity(qty: number) {
    console.log(qty);
  }

}
