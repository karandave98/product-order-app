import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductInterface } from 'src/app/models/products.interface';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  private subscription = new Subscription();
  isUpdate = false;
  prodId = 0;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private httpServ: HttpServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      productName: new FormControl('', Validators.compose([Validators.required])),
      productSKU: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15)])),
      productPrice: new FormControl('', Validators.required),
      id: ''
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe(param => {
        if (param.id) {
          this.isUpdate = true;
          this.prodId = Number(param.id);
          this.getProductDetailById();
        }
      })
    );
  }
  
  submitProductData(): void {
    if (this.productForm.valid) {
      if (this.prodId && this.isUpdate) {
        this.updateData();
      } else {
        this.postData();
      }
    } else {
      this.toast.error('Please Fill Valid Details');
    }
  }

  updateData(): void {
    this.subscription.add(
      this.httpServ.updateProductData(this.productForm.value).subscribe(() => {
        this.router.navigate(['/dashboard/prod-list']);
      }, error => {
        console.log(error);
        this.toast.error('Error While Updating the Product Details');
      })
    );
  }

  postData(): void {
    this.subscription.add(
      this.httpServ.addProduct(this.productForm.value).subscribe((prod: ProductInterface) => {
        this.router.navigate(['/dashboard/prod-list']);
      }, error => {
        console.log(error);
        this.toast.error('Error While Adding the Product Details');
      })
    );
  }

  getProductDetailById() {
    this.subscription.add(
      this.httpServ.getProductDetailsById(this.prodId).subscribe((prodDet: ProductInterface) => {
          this.productForm.patchValue(prodDet);
      }, err => {
        console.log(err);
        this.toast.error('Error While Getting Product Details');
      })
    );
  }

}
