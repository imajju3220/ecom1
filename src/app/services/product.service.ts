import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<any[]>{
    return this.http.get<any[]>("https://freeapi.miniprojectideas.com/api/amazon/GetAllProducts");
  }

  getAllCategory():Observable<any[]>{
    return this.http.get<any[]>("https://freeapi.miniprojectideas.com/api/amazon/GetAllCategory");
  }

  getAllProductsByCategory(id:number):Observable<any[]>{
    return this.http.get<any[]>("https://freeapi.miniprojectideas.com/api/amazon/GetAllProductsByCategoryId?id="+ id);
  }

  register(obj : any):Observable<any>{
    return this.http.post<any>("https://freeapi.miniprojectideas.com/api/amazon/RegisterCustomer", obj);
  }

  login(obj :any):Observable<any>{
    return this.http.post<any>("https://freeapi.miniprojectideas.com/api/amazon/Login", obj);
  }
}
