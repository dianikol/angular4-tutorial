import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { PageTransition, RouteTransition } from "../../route-transition.service";

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit, PageTransition {

  @ViewChild('page') page: ElementRef;
  id: number;

  constructor(protected route: ActivatedRoute,
              protected router: Router) { }
  ngOnInit() {
  }
}
