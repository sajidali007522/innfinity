import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {ProductsService} from "./products.service";
import {LoaderComponent} from "../components/loader/loader.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category;
  isLoading;
  public products= [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private product: ProductsService ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.category = params["category"];
      console.log(this.category);
      this.isLoading = true;
      this.product.getProducts(this.category).subscribe(products => {
        console.log(products['data'])
        this.products = products['data'];
        this.isLoading = false;
      },
      err => {
        //handle errors here
        console.log(err);
        this.isLoading = false;
      });
    });
  }

}
