import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageTransition, RouteTransition } from '../../route-transition.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, PageTransition {
  @ViewChild('page') page: ElementRef;

  constructor(protected router: Router, protected route: ActivatedRoute, private routeTransition: RouteTransition) {
  }

  goTo(to) {
    this.router.navigate(to);
  }

  ngOnInit() {
    this.routeTransition.animatePageIn(this.page);
  }
}
