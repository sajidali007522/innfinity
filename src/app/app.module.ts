import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {DataTablesModule} from 'angular-datatables';
import { NgInitDirective } from "./directives/NgInitDirective";

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import  { ErrorInterceptor } from './_helpers/error.interceptor';
// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { I18nModule } from './i18n/i18n.module';
import { HtmlElementsComponent } from './components/html-elements/html-elements.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HouseKeepingComponent } from './house-keeping/house-keeping.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { UsersComponent } from './users/users.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PopoverModule } from 'ngx-bootstrap/popover';

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
    LoaderComponent,
    HtmlElementsComponent,
    HouseKeepingComponent,
    NgInitDirective,
    LoginComponent,
    AlertComponent,
    UsersComponent,
    MainComponent,
    RegisterComponent,
    ReservationComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule.forRoot(),
    BrowserAnimationsModule,
    LazyLoadImageModule.forRoot({
      preset: scrollPreset // <-- tell LazyLoadImage that you want to use scrollPreset
    }),
    I18nModule,
    DataTablesModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    ImageCropperModule  //ImageCropperModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
