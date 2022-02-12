import { Injectable } from '@angular/core';
import { Product } from '../Models/Product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductBids } from 'src/Models/ProductBids';
// import { AuthenticationService } from '../services/authentication.service';
@Injectable({
    providedIn: 'root'
  })
  export class SellerService {
    private sellerUrl: string;
  
    // constructor(private httpClient: HttpClient, private authService:AuthenticationService) { 
    constructor(private httpClient: HttpClient) { 
        this.sellerUrl = 'http://localhost:10250/api/v1/seller/';
    }

    public  getProducts():Observable<Product[]>{
        let ELEMENT_DATA=this.httpClient.get<Array<Product>>(this.sellerUrl + 'GetProducts',{
        //   headers: new HttpHeaders()
        //     .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
        });
      console.log(ELEMENT_DATA);
      return ELEMENT_DATA;
    }

    public  Showproductbids(productId:string):Observable<ProductBids>{
      let ELEMENT_DATA=this.httpClient.get<ProductBids>(this.sellerUrl + 'show-bids/'+ `${productId}`,{
      //   headers: new HttpHeaders()
      //     .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      });
    console.log('Showproductbids');
    console.log(ELEMENT_DATA);
    return ELEMENT_DATA;
  }
}  