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
  constructor(private productSrv: ProductService) {}

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
}
