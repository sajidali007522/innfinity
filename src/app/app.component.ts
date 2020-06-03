import { Component } from '@angular/core';

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent
} from "@angular/router";

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  categories;
  loading;

  currentUser: User;

  constructor(public router: Router,
              private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    router.events.subscribe((routerEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit(): void {

  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  checkRouterEvent(routerEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
      console.log('navigation started');
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      console.log('navigation end');
      this.loading = false;
    }
  }


}
