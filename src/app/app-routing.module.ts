import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ContactCreateComponent} from "./contacts/contact-create/contact-create.component";
import {ContactListComponent} from "./contacts/contact-list/contact-list.component";
import {ProductsComponent} from "./products/products.component";
import {HtmlElementsComponent} from "./components/html-elements/html-elements.component";
import {HouseKeepingComponent} from "./house-keeping/house-keeping.component";
import {LoginComponent} from "./login/login.component";
import { AuthGuard} from "./_helpers/auth.guard";
import {MainComponent} from "./main/main.component";
import {RegisterComponent} from "./register/register.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {CarouselComponent} from "./carousel/carousel.component";
import {AutocompleteComponent} from "./components/autocomplete/autocomplete.component";
import {SearchLocationComponent} from "./search-location/search-location.component";
import {TranslationsComponent} from "./translations/translations.component";
import {DragNDropComponent} from "./drag-n-drop/drag-n-drop.component";
import {DigitalSignComponent} from "./digital-sign/digital-sign.component";
import {ReservationListComponent} from "./reservation-list/reservation-list.component";
import {Login2Component} from "./login2/login2.component";
import {WorkflowAdminComponent} from "./workflow-admin/workflow-admin.component";
import {SearchReservationComponent} from "./search-reservation/search-reservation.component";
import {ReservationPageComponent} from "./reservation-page/reservation-page.component";
import {ResultListComponent} from "./result-list/result-list.component";

const routes: Routes = [
  {path:  "", component: MainComponent,  canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {path: "contact-create", component: ContactCreateComponent, canActivate: [AuthGuard]},
      {path: "contact-list", component: ContactListComponent, canActivate: [AuthGuard]},
      {path: "products", component:ProductsComponent, canActivate: [AuthGuard] },
      {path: "products/:category", component:ProductsComponent, canActivate: [AuthGuard] },
      {path: "products/:category/sub-form/:sub_category", component:ProductsComponent, canActivate: [AuthGuard] },
      {path: "html_components", component:HtmlElementsComponent, canActivate: [AuthGuard] },
      {path: "house-keeping", component:HouseKeepingComponent, canActivate: [AuthGuard] },
      {path: "loader", component:LoaderComponent, canActivate: [AuthGuard] },
      {path: "reservation", component:ReservationComponent, canActivate: [AuthGuard] },
      {path: "reservation/:booking_id/search/:resource_type_id", component:ResultListComponent, canActivate: [AuthGuard] },
      {path: "carousel", component:CarouselComponent, canActivate: [AuthGuard] },
      {path: "autocomplete", component:AutocompleteComponent, canActivate: [AuthGuard] },
      {path: "search-location", component:SearchLocationComponent, canActivate: [AuthGuard] },
      {path: "translation-cache", component:TranslationsComponent, canActivate: [AuthGuard] },
      {path: "drag-n-drop", component:DragNDropComponent, canActivate: [AuthGuard] },
      {path: "sign-digitally", component:DigitalSignComponent, canActivate: [AuthGuard] },
      {path: "reservation-list", component:ReservationListComponent, canActivate: [AuthGuard] },
      {path: "workflow-admin", component:WorkflowAdminComponent, canActivate: [AuthGuard] },
      {path: "search-reservation", component:SearchReservationComponent, canActivate: [AuthGuard] },
    ]
  },

  {path: "login", component:LoginComponent },
  {path: "login2", component:Login2Component },
  {path: "make-reservation", component:ReservationPageComponent },
  {path: "reservation-result", component:ResultListComponent },
  {path: "register", component:RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
