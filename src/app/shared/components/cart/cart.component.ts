import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Component } from '@angular/core';

@Component ({
  selector: 'app-cart',
  template: `
  <ng-container *ngIf="{ total: total$ | async, quantity: quantity$ | async } as dataCart">
  <ng-container *ngIf="dataCart.total">
  <mat-icon class="mat-18">add_shopping_cart</mat-icon>
  {{ dataCart.total | currency }}
({{ dataCart.quantity }})
  </ng-container>

  </ng-container>
  `
})
export class CartComponent {
  quantity$ = this.shoppingCartSvc.quantityAction$;
  total$ = this.shoppingCartSvc.totalAction$;
  cart$ = this.shoppingCartSvc.cartAction$;


  constructor(private shoppingCartSvc: ShoppingCartService){}
}




