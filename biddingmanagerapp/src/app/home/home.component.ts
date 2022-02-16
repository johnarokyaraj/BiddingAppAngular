import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatPaginator,MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Product } from 'src/Models/Product';
import { SellerService } from 'src/Service/seller.service';
import { RouterService } from 'src/Service/router.service';
import { ProductBids } from 'src/Models/ProductBids';
import { Buyer } from 'src/Models/Buyer';
import { BuyerView } from 'src/Models/BuyerView';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

productList:Array<Product>;
productBids:ProductBids;
ProductsErrorMessage: string;
ProductBidsErrorMessage: string;
bidingList:Array<Buyer>;
Bidding:Buyer;
dataSource=new MatTableDataSource<Buyer>([]);
displayedColumns: string[]=["biddingAmount", "firstName", "email","phone"];
// ELEMENT_DATA: BuyerView[] = [
//   {'biddingAmount':'1','firstName':'Appolo','email':'Ent','phone':'John'},
//   {'biddingAmount':'2','firstName':'Bilroth','email':'Ent','phone':'John'},

// ];
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
// @ViewChild('input') input: ElementRef;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private sellerService: SellerService,
    private RouterService: RouterService) { 
      console.log('router.url-reg', this.router.url);

    }

    //productList=Product[];
  
    productId = new FormControl();
    selectedProductId:string;

    public productSelectForm: FormGroup;

    currProductDiv: string='';
    currBidsDiv: string='';
    currBidsGridDiv:string='';

  ngOnInit():void {
    this.productSelectForm= this.formBuilder.group({
      productId:['',[Validators.required]]
    } , { updateOn: 'change' });
    this.dataSource.paginator = this.paginator;

   
    this.getProducts();
  }
  //Get products from service
  getProducts(): void {
    this.sellerService.getProducts().subscribe((resp: any) => {
      this.productList = resp;
      console.log("productList");
      console.log(this.productList);
    }, (err) => {
      if (err.status === 404) {
        this.ProductsErrorMessage = err.message;
      } 
      this.productList=null;
      console.log(err);
    });
  }
  //view Products
  viewProducts(element:any) {
    console.log(element);
    this.RouterService.removeProductId();
    this.RouterService.setProductId(element);
    this.getProductBidss();
   
  }
  //product Submit
  productSubmit() {
    console.log('this.productSubmit', this.productSelectForm.value);
    if (this.productSelectForm.invalid) {
      console.log('this.productSelectForm', this.productSelectForm);
      return;
    }
  }
//get Product Bids from service
  getProductBidss(): any {
    this.sellerService.Showproductbids(this.RouterService.getProductId()).subscribe((resp: any) => {
      this.productBids = resp;
      console.log("productList and Bids");
      console.log(this.productBids);
      if(this.productBids!==null){
        this.currProductDiv="A";
         if (this.productBids.buyers!==null){
          this.currBidsDiv="A";
          // this.showProductBids(this.productBids.buyers);
          console.log('A');
        }
        else{
        this.ProductBidsErrorMessage = "No Active Bids Found";
          this.currBidsDiv="B";
          console.log('B');

        }
      }
        else{ this.currProductDiv="B";}
    }, (err) => {
      if (err.status === 404) {
        this.ProductsErrorMessage = err.error;
      } 
      console.log('error', err);
      this.productBids=null;
      if(this.productBids!==null){
        this.currProductDiv="A";}
        else{ this.currProductDiv="B";}
    });
  }

  showProductBids():void{
    console.log("bids");
    console.log(this.productBids.buyers);
    this.displayedColumns= ["biddingAmount", "firstName", "email","phone"];
    this.sellerService.FilterShowproductbids(this.RouterService.getProductId()).subscribe((resp: any) => {
    this.dataSource.data =resp;
    this.dataSource.paginator = this.paginator;
    this.currBidsGridDiv="A";
    console.log('Grid Loaded');
    },(err) => {});
  }

  onProductChanged():void{
    this.currProductDiv="";
    this.currBidsDiv="";
    this.currBidsGridDiv="";

  }
  
  
}
