import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RouteTransition } from "../route-transition.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  @ViewChild('page') page: ElementRef;
  private pageSubscription = new Subscription();

  constructor(protected router: Router, protected route: ActivatedRoute, private routeTransition: RouteTransition) {
    this.pageSubscription = this.routeTransition.unloadPage.subscribe((data) => {
      if ( data.length === 1 ) {
        this.routeTransition.animatePageOut(this.page, data);
      }
    });
  }

  ngOnInit() {
    this.routeTransition.animatePageIn(this.page);
  }

  ngOnDestroy() {
    this.pageSubscription.unsubscribe();
  }
}
