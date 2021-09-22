import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'prod-list',
    pathMatch: 'full'
  },
  {
    path: 'prod-list',
    component: ProductListComponent
  },
  {
    path: 'add-product',
    component: ProductDetailComponent
  },
  {
    path: 'update-prod/:id',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
