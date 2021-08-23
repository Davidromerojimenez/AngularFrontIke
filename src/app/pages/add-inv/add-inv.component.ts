import { Component, OnInit } from '@angular/core';
import { InvService } from '../inv/services/inv.service';
import { UtilService } from '../../shared/services/util.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-add-inv',
  templateUrl: './add-inv.component.html',
  styleUrls: ['./add-inv.component.scss']
})
export class AddInvComponent implements OnInit {


  constructor(private shoppingCartSvc: ShoppingCartService,private invService: InvService, private util: UtilService) { }




  product = {
    name: '',
    price: '',
    inventario_stock: '',
    date_venc: '',
    lote: 0
  }



  ngOnInit(): void {
    this.shoppingCartSvc.resetShoppingCart();
  }

  onSubmit(){
    console.log(this.product);
    this.invService.addProduct(this.product).subscribe((data: any) => {

      let alert_dialog = this.util.openDialog({
        status: 'success',
        spinner: false,
        title: '¡Hecho!',
        message: `Producto agregado con exito`,
      });
    });
  }

}
