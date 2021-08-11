import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-datails',
  templateUrl: './datails.component.html',
  styleUrls: ['./datails.component.scss']
})
export class DatailsComponent implements OnInit {

  total$ = this.shoppingCartSvc.totalAction$;
  cart$ = this.shoppingCartSvc.cartAction$;

  prod = [];

  //prod = cart$;



  constructor(private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {

  }

}
