import { Component, OnInit } from '@angular/core';
import { InvService } from './services/inv.service';
import { tap } from 'rxjs/operators';
import { Product } from './interfaces/inv.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
@Component({
  selector: 'app-products',
  template: `
  <section class="products">
  <app-product
    (addToCartClick)="addToCart(product)"
    [product]="product"
    *ngFor="let product of products"></app-product>
</section>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private productSvc: InvService, private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartSvc.resetShoppingCart();
    this.productSvc.getProducts()
      .pipe(
        tap((products: Product[]) => this.products = products)
      )
      .subscribe();
  }

  addToCart(product: Product): void {
    this.shoppingCartSvc.updateCart(product);
  }

}
