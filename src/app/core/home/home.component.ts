import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RouteTransition } from "../../route-transition.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('page') page: ElementRef;
  private pageSubscription = new Subscription();

  constructor(protected router: Router, protected route: ActivatedRoute, private routeTransition: RouteTransition) {
    this.pageSubscription = this.routeTransition.unloadPage.subscribe((data) => {
      this.goTo(data);
    });
  }

  goTo(to) {
    this.routeTransition.animatePageOut(this.page, to);
  }

  ngOnInit() {
    this.routeTransition.animatePageIn(this.page);
  }

  ngOnDestroy() {
    this.pageSubscription.unsubscribe();
  }
}
