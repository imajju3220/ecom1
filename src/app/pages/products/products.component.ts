import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsArray: any[] = [];
  categories: any[] = [];
  selectedCategory: number = 0;
  //this is for add to cart
  loggedObj: any = {};
  constructor(private productSrv: ProductService) {
    //this is for add to cart
    const localData = localStorage.getItem('amazon_user');
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
    }
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategory();
  }

  loadProducts() {
    this.productSrv.getAllProducts().subscribe((res: any) => {
      console.log(res);
      this.productsArray = res.data;
    });
  }

  loadCategory() {
    this.productSrv.getAllCategory().subscribe((res: any) => {
      console.log(res);
      this.categories = res.data;
    });
  }

  getAllProductsByCategory(catergoryId: number) {
    this.selectedCategory = catergoryId;
    this.productSrv
      .getAllProductsByCategory(catergoryId)
      .subscribe((res: any) => {
        console.log(res.data);
        this.productsArray = res.data;
      });
  }

  addtoCart(productId: number) {
    //debugger;
    const obj = {
      CartId: 0,
      CustId: this.loggedObj.custId,
      ProductId: productId,
      Quantity: 1,
      AddedDate: new Date(),
    };
    this.productSrv.addtoCart(obj).subscribe((res: any) => {
      if (res.result) {
        alert('product added to cart');
        //this is for cart
        this.productSrv.cartUpdated.next(true);
      } else {
        alert(res.message);
      }
    });
  }
}
