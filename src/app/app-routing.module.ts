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

const routes: Routes = [
  {path:  "", component: MainComponent,  canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {path: "contact-create", component: ContactCreateComponent, canActivate: [AuthGuard]},
      {path: "contact-list", component: ContactListComponent, canActivate: [AuthGuard]},
      {path: "products", component:ProductsComponent, canActivate: [AuthGuard] },
      {path: "products/:category", component:ProductsComponent, canActivate: [AuthGuard] },
      {path: "html_components", component:HtmlElementsComponent, canActivate: [AuthGuard] },
      {path: "house-keeping", component:HouseKeepingComponent, canActivate: [AuthGuard] },
      {path: "loader", component:LoaderComponent, canActivate: [AuthGuard] },
    ]
  },

  {path: "login", component:LoginComponent },
  {path: "register", component:RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
