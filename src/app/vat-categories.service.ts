import { Injectable } from '@angular/core';

export enum VatCategory {
  Food = 20,
  Drinks = 10
}

@Injectable({
  providedIn: 'root'
})
export class VatCategoriesService {

  constructor() { }

  public getVat(category: VatCategory): number {
    switch(category) {
      case VatCategory.Food: return VatCategory.Food;
      case VatCategory.Drinks: return VatCategory.Drinks;
      default: return NaN;
    }
  }
}
