import { Component, OnInit, Input } from '@angular/core';
import { NavLink } from './types';
import {Router} from '@angular/router';
import { Config } from './config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() defaultLinks: NavLink[] = Config.defaultNavLinks;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(url: string){
    console.log('url', url);
    //this.router.navigate([url])
  }
}
