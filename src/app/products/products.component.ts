import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {ProductsService} from "./products.service";
import {LoaderComponent} from "../components/loader/loader.component";
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
