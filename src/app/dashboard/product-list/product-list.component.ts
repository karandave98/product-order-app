import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { map, mergeMap, retry } from 'rxjs/operators';
import { ProductInterface } from 'src/app/models/products.interface';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  productsList: ProductInterface[] = [];
  subscribeArr: Subscription = new Subscription();
  @ViewChild('filterProductId') filterProductId: ElementRef; 

  constructor(private httpServ: HttpServiceService,
    private toast: ToastrService,
    private router: Router,
    private elm: ElementRef
  ) { this.filterProductId = elm; }
  ngOnDestroy(): void {
    this.subscribeArr.unsubscribe();
  }

  ngOnInit(): void {
    this.getProductDetails();
    this.setFilterDetails();
  }

  getProductDetails(): void {
    this.subscribeArr.add(
      this.subscribeArr.add(
        this.httpServ.getProductsList().subscribe((prodList: ProductInterface[]) => {
            this.productsList = prodList;
          }, error => {
            console.error(error);
            this.toast.error('Error While Fetching Products List');
          })
        )
      );
  }

  editProduct(item: ProductInterface): void {
    this.router.navigate(['/dashboard/update-prod', item.id]);
  }

  deleteProduct(item: ProductInterface, i: number): void {
    this.subscribeArr.add(
      this.httpServ.deleteProduct(item.id).subscribe(() => {
        this.getProductDetails();
      })
    );
  }


  setFilterDetails(): void {
    this.subscribeArr.add(
      fromEvent(this.filterProductId.nativeElement, 'keyup')
      .pipe(
        mergeMap((evnt: any) => {
         return this.httpServ.filterOutData(evnt.target.value)
        })
      )
      .subscribe(
        (prodList: ProductInterface[]) => {
          this.productsList = prodList;
        }
      )
    );
  }
}
