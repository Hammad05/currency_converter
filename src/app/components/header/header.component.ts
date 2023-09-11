// Import statements
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { config, Link } from './config';
import { NavLink } from './types';

// Component decorator
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // Input properties
  @Input() defaultLinks: NavLink[] = config.defaultNavLinks;
  @Input() title: string = 'Currency Exchanger';

  // Constructor with dependency injection
  constructor(
    private router: Router,
    private location: Location,
  ) {}

  // Angular lifecycle hook - ngOnInit
  ngOnInit() {
    // Subscribe to router events to update the title dynamically
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = 'Currency Exchanger';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        }),
      )
      .subscribe((title: string) => {
        if (title) {
          this.title = title;
        }
      });
  }

  // Method to navigate to a specific route
  navigateTo(data: Link) {
    this.router.navigate([data.url, data.params]);
  }

  // Method to determine whether to display the back button
  displayBackButton() {
    return this.router.url !== '/';
  }

  // Method to navigate back to the root route
  goBack() {
    this.router.navigate(['/']);
  }
}
