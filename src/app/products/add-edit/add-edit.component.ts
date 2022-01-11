import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Path, Product } from 'src/app/models';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  productFormGroup: FormGroup;
  categories;
  productId;
  productDetails: Product;
  isSubmitted = false;
  constructor(private productService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.productId = data.productId;
      if(this.productId) {
        this.loadProductDetails();
      } else {
        this.productDetails = new Product();
        this.buildForm();
      }
    });            
    this.loadCategories();
  }

  buildForm() {    
    this.productFormGroup = this.formBuilder.group({
      title: new FormControl(this.productDetails?.title, Validators.required),
      description: new FormControl(this.productDetails?.description, Validators.required),
      category: new FormControl(this.productDetails?.category, Validators.required),
      price: new FormControl(this.productDetails?.price, Validators.required)
    });
  }

  loadProductDetails() {
    this.productService.getProduct(this.productId).subscribe(response => {
      this.productDetails = response;
      this.buildForm();
    })
  }
  
  save() {
    this.isSubmitted = true;
    if (this.productFormGroup.valid) {
      if (this.productId) {
        this.productService.updateProduct(this.productFormGroup.getRawValue(), this.productId).subscribe(reponse => {
          alert("Successfully updated Product Information");          
          this.navigateToProducts();
        })
      } else {
        this.productService.addProduct(this.productFormGroup.getRawValue()).subscribe(reponse => {
          alert("Successfully saved Product Information");
          this.navigateToProducts();
        })
      }
    }
  }

  loadCategories() {
    this.productService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  get f() {return this.productFormGroup.controls};

  navigateToProducts() {
    this.router.navigateByUrl(Path.PRODUCTS);
  }

  reset() {
    this.productFormGroup.reset();
    this.productFormGroup.markAsUntouched();
  }

}
