import { Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RouteTransition } from "../../route-transition.service";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('page') page: ElementRef;
  recipe: Recipe;
  id: number;
  loadedimes = 0;
  private pageSubscription = new Subscription();

  constructor(private recipeService: RecipeService,
              protected route: ActivatedRoute,
              protected router: Router,
              private routeTransition: RouteTransition) {

    this.pageSubscription = this.routeTransition.unloadPage.subscribe((data) => {
      this.routeTransition.animatePageOut(this.page, data);
    });
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
          this.routeTransition.animatePageIn(this.page, this.loadedimes);
          this.loadedimes++;
        }
      );
  }



  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy() {
    this.pageSubscription.unsubscribe();
  }
}
