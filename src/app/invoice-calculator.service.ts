import { Injectable } from '@angular/core';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculatorService {

  constructor(private vatCategoriesService: VatCategoriesService) { }

  public CalculatePriceExclusiveVat(priceInclusiveVat: number, vatPercentage: number): number {
    return priceInclusiveVat / (1 + vatPercentage / 100);
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    let invoice: Invoice = {
      invoiceLines: [],
      totalPriceExclusiveVat: 0,
      totalPriceInclusiveVat: 0,
      totalVat: 0
    };
    invoiceLines.forEach(element => {
      let curVat = this.vatCategoriesService.getVat(element.vatCategory);
      let complete: InvoiceLineComplete = {
        product: element.product,
        vatCategory: element.vatCategory,
        priceInclusiveVat: element.priceInclusiveVat,
        priceExclusiveVat: this.CalculatePriceExclusiveVat(element.priceInclusiveVat, curVat)
      };
      invoice.invoiceLines.push(complete);
      invoice.totalPriceExclusiveVat += complete.priceExclusiveVat;
      invoice.totalPriceInclusiveVat += complete.priceInclusiveVat;
      invoice.totalVat += curVat;
    });
    return invoice;
  }
}
