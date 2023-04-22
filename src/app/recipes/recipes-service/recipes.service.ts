import {Recipe} from "../recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {Subject} from "rxjs";
@Injectable({providedIn: 'root'})
export class RecipesService{
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe("A Test Recipe", "A very delicious meal!",
  //     "https://www.maxfitmeals.com/wp-content/uploads/2021/12/Chicken-Shwarma.webp",
  //     [
  //       new Ingredient("Steak",1),
  //       new Ingredient("Rice",1)
  //     ]),
  //   new Recipe("Fried pork with leek","My favorite meal",
  //     "https://gradcontent.com/lib/400x296/svinskosprazche.jpg",
  //     [
  //       new Ingredient("Leek", 4),
  //       new Ingredient("Pork", 1)
  //     ]),
  // ];
  private recipes: Recipe[] = [];
  constructor(private shoppingService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
      this.shoppingService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
