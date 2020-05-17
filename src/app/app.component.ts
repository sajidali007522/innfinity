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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  categories;
  loading;

  constructor(public router: Router) {
    router.events.subscribe((routerEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit(): void {

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
