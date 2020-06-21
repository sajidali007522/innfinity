import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../categories.service";

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ListViewComponent} from "./list-view/list-view.component";
import {AuthenticationService} from "../../_services/authentication.service";
import {ConfigService} from "../../config.service";

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
              private appConfigService: ConfigService
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
    if(category.children.length > 0 ) return;
    category.isLoading = true;
    this.catService.loadCategories(category.id).subscribe(categories => {
        console.log(categories['data'])
        this.categories = this.catService.setChildren(this.categories, category, categories['data']);
        category.isLoading = false;
      },
      err => {
        //handle errors here
        console.log(err);
        category.isLoading = false;
      });

  }

}
