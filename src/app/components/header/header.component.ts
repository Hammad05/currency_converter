import { Component, OnInit, Input } from '@angular/core';
import { NavLink } from './types';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Link, config } from './config';
import { filter, map } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() defaultLinks: NavLink[] = config.defaultNavLinks;
  @Input() title: string = 'Currency Exchanger';
  constructor(
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
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

  navigateTo(data: Link) {
    this.router.navigate([data.url, data.params]);
  }

  displayBackButton() {
    return this.router.url !== '/';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
