import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { FooterComponent } from './components/footer/footer.component';
import { ContactCreateComponent } from './contacts/contact-create/contact-create.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ProductsComponent } from './products/products.component';
import { ListViewComponent } from "./components/side-nav/list-view/list-view.component";
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    ContactCreateComponent,
    ContactListComponent,
    ProductsComponent,
    ListViewComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TreeModule.forRoot(),
    LazyLoadImageModule.forRoot({
      preset: scrollPreset // <-- tell LazyLoadImage that you want to use scrollPreset
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
