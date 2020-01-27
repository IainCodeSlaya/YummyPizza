import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/shared/order.service';
import { Vat } from 'src/app/shared/vat.model';
import { Pmethod } from 'src/app/shared/pmethod.model';
import { ToastrService } from 'ngx-toastr';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  vatList: Vat[];
  pmethodList: Pmethod[];
  isValid: Boolean = true;
  ordcomp: OrderComponent;
  change: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<InvoicesComponent>,
    private oService: OrderService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.oService.getVATList().then(res => {
      this.vatList = res as Vat[];
     });
    this.oService.getPMethodList().then(res => this.pmethodList = res as Pmethod[]);

    this.oService.invoiceData = {
      Invoice_ID: 0,
      Subtotal: this.oService.orderData.OTotal,
      Amount_Tendered: 0,
      Change: 0,
      VAT_ID: 0,
      Vat_Percent: 0,
      Order_ID: 0,
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
    c = +c.toFixed(2);
    return c;
  }

  selectPMethod(ctrl) {
    console.log(this.oService.orderID);
    if (ctrl.selectedIndex === 0) {
      this.oService.invoiceData.PMethod_Descr = '';
    } else {
      this.oService.invoiceData.PMethod_Descr = this.pmethodList[ctrl.selectedIndex - 1].PMethod_Descr;
      this.oService.invoiceData.VAT_ID = this.vatList[0].Vat_ID;
      this.oService.invoiceData.Vat_Percent = this.vatList[0].Vat_Percent;
      this.oService.invoiceData.Invoice_Total = this.calculateVAT();
      this.oService.invoiceData.Order_ID = this.oService.orderID;

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
    if (this.oService.invoiceData.PMethod_Descr === 'Cash') {
      if (this.validateForm()) {
        if (confirm('Are you sure you want to complete this order?')) {
          this.saveOrder();
        }
      }
    } else {
      if (confirm('Are you sure you want to complete this order?')) {
        this.saveOrder();
      }
    }
  }

  calculateChange(value): void {
    if (isNaN(value)) {
      this.toastr.error('Amount Paid must be a number with format: YY.YY', 'Yummy Pizza');
    } else {
      this.change = value - this.oService.invoiceData.Invoice_Total;
      this.change = +this.change.toFixed(2);
      if (this.change < 0) {
        // this.toastr.error('Amount Paid is not enough', 'Yummy Pizza');
      } else {
        this.oService.invoiceData.Change = this.change;
      }
    }
  }

  saveOrder() {
    this.oService.saveInvoice(this.oService.invoiceData).subscribe(res => {
      this.toastr.success('Order Completed Successfully', 'Yummy Pizza');
      this.dialogRef.close();
    });
  }

  cancelOrder() {
    if (confirm('Are you sure you want to cancel the order?')) {
      this.oService.deleteOrder(this.oService.orderID).then(res => {
        this.toastr.warning('Order Cancelled', 'Yummy Pizza');
        this.dialogRef.close();
      });
    }
  }

  validateForm() {
    this.isValid = true;
    if (this.oService.invoiceData.Amount_Tendered === 0) {
      this.toastr.error('Please enter the amount paid', 'Yummy Pizza');
      this.isValid = false;
    } else if (isNaN(this.oService.invoiceData.Amount_Tendered)) {
      this.toastr.error('Amount Paid must be a number', 'Yummy Pizza');
      this.isValid = false;
    } else if (this.change < 0) {
      this.toastr.error('Amount Paid is not enough', 'Yummy Pizza');
      this.isValid = false;
    }
    return this.isValid;
  }
}
