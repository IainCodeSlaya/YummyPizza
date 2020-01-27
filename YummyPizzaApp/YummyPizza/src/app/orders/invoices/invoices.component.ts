import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/shared/order.service';
import { Vat } from 'src/app/shared/vat.model';
import { Pmethod } from 'src/app/shared/pmethod.model';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  vatList: Vat[];
  pmethodList: Pmethod[];
  isValid: Boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<InvoicesComponent>,
    private oService: OrderService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.oService.getVATList().then(res => {
      this.vatList = res as Vat[];
      console.log(res, "iain3");
      console.log(this.vatList);
     });
    console.log(this.vatList);
    this.oService.getPMethodList().then(res => this.pmethodList = res as Pmethod[]);

    this.oService.invoiceData = {
      Invoice_ID: null,
      Subtotal: this.oService.orderData.OTotal,
      Amount_Tendered: 0,
      Change: 0,
      VAT_ID: 0,
      Vat_Percent: 0,
      Order_ID: this.oService.orderID,
      PMethod_ID: 0,
      PMethod_Descr: '',
      Invoice_Total: 0
    };

    this.oService.pmethodData = {
      PMethod_ID: 0,
      PMethod_Descr: ''
    };
  }

  calculateVAT() {
    let c: number;
    let d: number;
    // this.oService.invoiceData.VAT_ID = 1; // this.vatList[1].Vat_ID;
    // this.oService.invoiceData.Vat_Percent = this.vatList[1].Vat_Percent;
    d = 1 + (this.oService.invoiceData.Vat_Percent / 100);
    c = this.oService.orderData.OTotal * d;
    return c;
  }

  selectPMethod(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.oService.invoiceData.PMethod_Descr = '';
    } else {
      this.oService.invoiceData.PMethod_Descr = this.pmethodList[ctrl.selectedIndex - 1].PMethod_Descr;
      this.oService.invoiceData.VAT_ID = this.vatList[0].Vat_ID;
      this.oService.invoiceData.Vat_Percent = this.vatList[0].Vat_Percent;
      this.oService.invoiceData.Invoice_Total = this.calculateVAT();

      this.unhideDiv();
      let ati = document.getElementById('ati') as HTMLInputElement;
      let cl = document.getElementById('cl') as HTMLLabelElement;
      let dci = document.getElementById('dci') as HTMLDivElement;
      let ci = document.getElementById('ci') as HTMLInputElement;

      if (this.oService.invoiceData.PMethod_Descr === 'Cash') {
        ati.readOnly = false;
        cl.hidden = false;
        ci.hidden = false;
        dci.hidden = false;
        this.oService.invoiceData.Amount_Tendered = 0;
      } else {
        ati.readOnly = true;
        cl.hidden = true;
        ci.hidden = true;
        dci.hidden = true;
        this.oService.invoiceData.Amount_Tendered = this.oService.invoiceData.Invoice_Total;
      }
    }
  }

  unhideDiv() {
    let atl = document.getElementById('atl') as HTMLLabelElement;
    let dati = document.getElementById('dati') as HTMLDivElement;
    let ati = document.getElementById('ati') as HTMLInputElement;
    let vl = document.getElementById('vl') as HTMLLabelElement;
    let vi = document.getElementById('vi') as HTMLInputElement;
    let totald = document.getElementById('totald') as HTMLDivElement;
    let cob = document.getElementById('cob') as HTMLDivElement;

    atl.hidden = false;
    dati.hidden = false;
    ati.hidden = false;
    vl.hidden = false;
    vi.hidden = false;
    totald.hidden = false;
    cob.hidden = false;
  }

  completeOrder() {

  }

  cancelOrder() {

  }

  validateForm() {
    this.isValid = true;
    if (this.oService.orderData.Order_Type_ID === 0) {
      this.isValid = false;
    }
    return this.isValid;
  }
}
