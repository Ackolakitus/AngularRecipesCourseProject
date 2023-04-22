import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from "../recipe.model";
import {RecipesService} from "../recipes-service/recipes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[] = [];
  subscription: Subscription;
  constructor(private recipesService: RecipesService) { }

  ngOnInit(){
    this.subscription = this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipesService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
