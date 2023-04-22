import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {RecipesService} from "../recipes/recipes-service/recipes.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipesService) {}

  // storeRecipes(recipes: Recipe[]){}
  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://recipes-and-shopping-e697f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    ).subscribe(response =>{
      console.log(response);
    });
  }

  fetchRecipes(){

      return this.http.get<Recipe[]>('https://recipes-and-shopping-e697f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .pipe(
      map(recipes => {
        return recipes.map(
          recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))
  }
}
