import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {DataTablesModule} from 'angular-datatables';
import { NgInitDirective } from "./directives/NgInitDirective";
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {ConfigService} from "./config.service";
import { DynamicFormFieldsComponent } from './components/dynamic-form-fields/dynamic-form-fields.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import {CacheInterceptor} from "./cache.interceptor";
import { TranslationsComponent } from './translations/translations.component';
import { DragNDropComponent } from './drag-n-drop/drag-n-drop.component';
import { DigitalSignComponent } from './digital-sign/digital-sign.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { Login2Component } from './login2/login2.component';

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
    CarouselComponent,
    AutocompleteComponent,
    DynamicFormFieldsComponent,
    SearchLocationComponent,
    TranslationsComponent,
    DragNDropComponent,
    DigitalSignComponent,
    ReservationListComponent,
    Login2Component
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
    ImageCropperModule,  //ImageCropperModule
    AutocompleteLibModule,
    NgxExtendedPdfViewerModule,
    DragDropModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (appConfigService: ConfigService) => {
        return () => {
          //Make sure to return a promise!
          return appConfigService.loadAppConfig();
        };
      }
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
