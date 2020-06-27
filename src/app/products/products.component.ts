import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {ProductsService} from "./products.service";
import {LoaderComponent} from "../components/loader/loader.component";
import {DynamicFormFieldsComponent} from "../components/dynamic-form-fields/dynamic-form-fields.component";
declare var $:JQueryStatic;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('productContainer') el:ElementRef;
  category;
  isLoading;
  layoutCats;
  public products= [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private product: ProductsService ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.category = params["category"];
      this.layoutCats = params['sub_category'] ? params['sub_category'].split("_") : [];
      console.log(params);
      console.log(this.category);
      this.isLoading = true;
      this.product.getProducts(this.category).subscribe(products => {
        console.log("subscribed", products);
        this.products = products['data'].length > 0 ? products['data'] : [{fields: []}];
      },
      err => {
        //handle errors here
        console.log(err);
      },
      () => {
        console.log("completed");
        this.isLoading = false;
        this.loadChildProducts();
      }
      );
    });
  }

  public loadChildProducts () {
    if(this.layoutCats.length > 0 ) {
      for (let index = 0; index < this.layoutCats.length; index ++ ) {
        this.isLoading = true;
        this.product.getProducts(this.layoutCats[index]).subscribe(products => {
            if(typeof this.products[0].childProducts == 'undefined') {
              this.products[0]['childProducts'] = [];
            }
            this.products[0]['childProducts'].push(products['data'][0]);
          },
          err => {
            //handle errors here
            console.log(err);
          },
          () => {
            this.isLoading = false;
          });
      }

    }
  }

  ngAfterViewInit(): void {
    console.log("view is ready");

    $('body').on('click', '.custom-accordion > h3 > a',  function(e, arg) {
      console.log($(this).attr('class'));
      if( $(this).parent().hasClass('active') ){
        $(this).parent().removeClass('active');
        $(this).parent().next('.custom-accordion-content').slideUp();
      }
      else{
        $(this).parent().addClass('active');
        $(this).parent().next('.custom-accordion-content').slideDown();
      }
      return false;
    });

  }

}
