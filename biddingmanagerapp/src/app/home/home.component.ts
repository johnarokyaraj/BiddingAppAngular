import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatPaginator,MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";

import { Product } from 'src/Models/Product';
import { SellerService } from 'src/Service/seller.service';
import { RouterService } from 'src/Service/router.service';
import { ProductBids } from 'src/Models/ProductBids';
import { Buyer } from 'src/Models/Buyer';
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
BiddingRow:Buyer;
dataSource=new MatTableDataSource<Buyer>([]);
displayedColumns: string[]=["biddingAmount", "firstName", "email","phone"];
TotalRowsCount:number=1;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort,{static: true}) sort: MatSort;
// @ViewChild('input') input: ElementRef;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private sellerService: SellerService,
    private RouterService: RouterService) { 
      console.log('router.url-reg', this.router.url);

    }
  
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

  ngAfterViewInit() {
    console.log('Called-ngAfterViewInit');
    this.dataSource.sort = this.sort;
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // merge(this.sort.sortChange, this.paginator.page)
    //     .pipe(
    //         tap(() => this.loadLessonsPage())
    //     )
    //     .subscribe();
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
      this.BiddingRow=resp[0];
      this.TotalRowsCount=5;
      this.dataSource.data =resp;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.currBidsGridDiv="A";
    console.log('Grid Loaded');
  this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 1);
  merge(this.sort.sortChange, this.paginator.page)
  .pipe(
      tap(() => this.loadLessonsPage())
  )
  .subscribe();  
  },(err) => {
      if (err.status === 404) {
        this.ProductsErrorMessage = err.error;
      } 
      console.log('error', err);
   
    });
    
  }
  loadLessonsPage() {
    console.log('Called');
    this.sellerService.FilterShowproductbids(this.RouterService.getProductId(),'BiddingAmount',this.sort.direction,this.paginator.pageIndex,this.paginator.pageSize).subscribe((resp: any) => {
      this.dataSource.data =resp;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('Grid Loaded');
    },(err) => {
      if (err.status === 404) {
        this.ProductsErrorMessage = err.error;
      } 
      console.log('error', err);
   
    });
  }
  onProductChanged():void{
    this.currProductDiv="";
    this.currBidsDiv="";
    this.currBidsGridDiv="";

  }
  
  
}
