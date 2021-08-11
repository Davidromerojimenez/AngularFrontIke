import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../inv/interfaces/inv.interface';
import { InvService } from '../inv/services/inv.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  doc:  any;
  cart: Product[] = [];
  cartFactura = [];


  constructor(
    private util: UtilService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router, private productSvc: InvService) {
      this.checkIfCartEmpty();
     }

  ngOnInit(): void {
    this.getDataCart();
    this.prepareDetails();
    console.log(this.cartFactura);
  }





  getFacturaPdf() {


    this.doc = new jsPDF()

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    this.doc.autoTable({ html: '#my-table' })

    // Or use javascript directly:
    this.doc.autoTable({
      head: [['Producto', 'Precio', 'Inventario', 'Qty', 'Sub total']],
      body: this.cartFactura,
    })

    this.doc.save('factura.pdf');



    //window.open(pdf.output('bloburl'), '_blank');

  }

  revertir(): void{

    console.log('revertir');
    this.cart.forEach((product:Product) => {
      console.log(product);
      const {id:productId, name:productName, qty:quantity, inventario_stock} = product;
      const updateStock = (inventario_stock + quantity);
      console.log(productId);
      console.log(updateStock);
      this.productSvc.revertStock(productId, updateStock)
      .pipe(
        tap(res => {
          let alert_dialog = this.util.openDialog({
            status: 'success',
            spinner: false,
            title: '¡Hecho!',
            message: `Transaccion revertida!`,
          });

            this.router.navigate(['/products']);

        })
      )
      .subscribe();

    });

  }



  private prepareDetails (): Details[]{
    const details : Details[] = [];
    this.cart.forEach((product:Product) => {
      console.log(product);
      const {id:productId, name:productName, qty:quantity, inventario_stock} = product;
      const updateStock = (inventario_stock - quantity);

      this.productSvc.updateStock(productId, updateStock)
      .pipe()
      .subscribe();

      details.push({productId, productName, quantity});

      // agrego arreglo factura

      this.cartFactura.push([product.name,product.price,product.inventario_stock,product.qty,product.qty*product.price]);

    });
    return details;
  }

  private getDataCart (): void{
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products: Product[]) => this.cart = products)
    )
    .subscribe();
  }

  private checkIfCartEmpty(): void {
    this.shoppingCartSvc.cartAction$.pipe(
      tap(res => {
        if(res && !res.length){
          this.router.navigate(['/products']);
        }
      })
    ).subscribe();
  }

}
