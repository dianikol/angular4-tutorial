import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { RouteTransition } from "../../route-transition.service";

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit, OnDestroy {

  @ViewChild('page') page: ElementRef;
  id: number;

  private pageSubscription = new Subscription();

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              private routeTransition: RouteTransition) {

    this.pageSubscription = this.routeTransition.unloadPage.subscribe((data) => {
      this.routeTransition.animatePageOut(this.page, data);
    });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.pageSubscription.unsubscribe();
  }
}
