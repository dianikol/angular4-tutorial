import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { RouteTransition } from "../route-transition.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  @ViewChild('page') page: ElementRef;
  ingredients: Ingredient[];
  private subscription: Subscription;
  private pageSubscription = new Subscription();

  constructor(private slService: ShoppingListService, private routeTransition: RouteTransition) {
    this.pageSubscription = this.routeTransition.unloadPage.subscribe((data) => {
      this.routeTransition.animatePageOut(this.page, data);
    });
  }

  ngOnInit() {
    this.routeTransition.animatePageIn(this.page);
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.pageSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }
}
