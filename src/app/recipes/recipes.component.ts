import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTransition, RouteTransition } from '../route-transition.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, PageTransition {
  @ViewChild('page') page: ElementRef;

  constructor(protected router: Router, protected route: ActivatedRoute, private routeTransition: RouteTransition) { }

  ngOnInit() {
    this.routeTransition.animatePageIn(this.page);
  }

  test() {
    alert('sakis');
  }
}
