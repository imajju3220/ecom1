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

  loggedObj: any;

  //here constructor is required to use ProductService only
  constructor(private productSrv: ProductService) {
    const localData = localStorage.getItem('amazon_user');
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
    }
  }

  onRegister() {
    this.productSrv.register(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        alert('user created');
      } else {
        alert(res.message);
      }
    });
  }

  onLogin() {
    this.productSrv.login(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert('login successful');
        localStorage.setItem('amazon user', JSON.stringify(res.data));
      } else {
        alert(res.message);
      }
    });
  }
}
