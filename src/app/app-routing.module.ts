import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './shared/components/signup/signup.component';
import { SigninComponent } from './shared/components/signin/signin.component';
import{AuthGuard} from './auth.guard';
import {AddInvComponent} from './pages/add-inv/add-inv.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'add-inv', component: AddInvComponent,
  canActivate: [AuthGuard] },
  { path: 'products',
  loadChildren: () => import('./pages/inv/products.module')
  .then(m => m.ProductsModule),
  canActivate: [AuthGuard] },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) }, {

    path: '', redirectTo: '/products', pathMatch: 'full'
  }, {

    path: '**', redirectTo: '', pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
