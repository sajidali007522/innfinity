import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../categories.service";

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ListViewComponent} from "./list-view/list-view.component";
import {AuthenticationService} from "../../_services/authentication.service";
import {ConfigService} from "../../config.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  categories;
  isLoading;
  custom_configs;

  constructor(public catService: CategoriesService,
              private appConfigService: ConfigService,
              public router: Router
  ) {
    this.custom_configs = this.appConfigService.ui_configs;
  }

  ngOnInit(): void {

    this.isLoading = true;
    this.catService.loadCategories().subscribe(categories => {
        //console.log(categories)
        this.categories = categories['data'];
        this.isLoading = false;
      },
      err => {
        //handle errors here
        console.log(err);
        this.isLoading = false;
      });
  }

  loadSubCategories(category, $event): void {
    $event.preventDefault();
    if(category.children.length > 0 ) {
      //check If child has enabled display content
      this.checkIfHasContentEnabled(category.children, category.id)
      return;
    }
    category.isLoading = true;
    this.catService.loadCategories(category.id).subscribe(categories => {
        console.log(categories['data'])
        this.categories = this.catService.setChildren(this.categories, category, categories['data']);
        category.isLoading = false;
        this.checkIfHasContentEnabled(categories['data'], category.id);
      },
      err => {
        //handle errors here
        console.log(err);
        category.isLoading = false;
      });

  }

  checkIfHasContentEnabled (categorydata, categoryId) {
    if(categorydata.length > 0 ) {
      let displayContent = false
      for(let index =0; index < categorydata.length; index++) {
          if(categorydata[index].displayContent) {
            displayContent = true;
            break;
          }
      }
      if(displayContent) {
        this.router.navigate(['/products/'+ categoryId])
      }
    }
  }

}
