import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecom-project1';

  isRegisterVisible: boolean = false;
  isLoginVisible: boolean = false;

  registerObj: any = {
    CustId: 0,
    Name: '',
    MobileNo: '',
    Password: '',
  };

  // api problem we have to pass mobile no instead of username
  loginObj: any = {
    UserName: '',
    UserPassword: '',
  };

  loggedObj: any = {};
  cartItems: any = [];

  //here constructor is required to use ProductService only
  constructor(private productSrv: ProductService) {
    const localData = localStorage.getItem('amazon_user');
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
      //this is for add to cart
      //debugger;
      this.getCartData(this.loggedObj.custId);
    }

    //this is for add to cart
    this.productSrv.cartUpdated.subscribe((res: boolean) => {
      if (res) {
        this.getCartData(this.loggedObj.custId);
      }
    });
  }

  //this is for add to cart
  getCartData(id: number) {
    this.productSrv.getAddtocartdataByCust(id).subscribe((res: any) => {
      this.cartItems = res.data;
    });
  }

  onRegister() {
    this.productSrv.register(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        alert('user created');
        this.isRegisterVisible = false;
      } else {
        alert(res.message);
      }
    });
  }

  onLogin() {
    this.productSrv.login(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert('login successful');
        //debugger;
        this.loggedObj = res.data;
        localStorage.setItem('amazon_user', JSON.stringify(res.data));
        this.isLoginVisible = false;
      } else {
        alert(res.message);
      }
    });
  }
  //this is for add to cart
  removeItem(cartId: number) {
    this.productSrv.removeProductFromCart(cartId).subscribe((res: any) => {
      if (res.result) {
        alert('item removed');
        this.getCartData(this.loggedObj.custId);
      } else {
        alert(res.message);
      }
    });
  }
}
