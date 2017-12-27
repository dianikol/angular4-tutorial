import { Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { PageTransition, RouteTransition } from "../../route-transition.service";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, PageTransition {
  @ViewChild('page') page: ElementRef;
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              protected route: ActivatedRoute,
              protected router: Router,
              private routeTransition: RouteTransition) { }

  ngOnInit() {
    this.routeTransition.animatePageIn(this.page, false);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
          this.routeTransition.animatePageIn(this.page, true);
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

}
