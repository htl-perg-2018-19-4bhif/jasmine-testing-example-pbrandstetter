import { Component } from '@angular/core';
import { InvoiceLine, InvoiceCalculatorService, Invoice } from './invoice-calculator.service';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  invoiceLines: InvoiceLine[] = [];
  invoice: Invoice;

  product = '';
  priceInclusiveVat = 0;
  vatCategoryString = 'Food';

  vatCategories = VatCategory;

  constructor(private invoiceCalculator: InvoiceCalculatorService) { 
    this.invoice = this.invoiceCalculator.CalculateInvoice(this.invoiceLines);
  }

  addInvoice() {
    let newLine: InvoiceLine = {
      product: this.product,
      vatCategory: this.vatCategoryString === 'Drinks' ? this.vatCategories.Drinks : this.vatCategories.Food,
      priceInclusiveVat: this.priceInclusiveVat
    }
    this.invoiceLines.push(newLine);
    this.invoice = this.invoiceCalculator.CalculateInvoice(this.invoiceLines);
  }
}
