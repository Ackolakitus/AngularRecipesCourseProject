import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private shoppingService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit(){
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientsChanged.
    subscribe(
      (ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })

    this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit!")
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingService.startedEditing.next(index);
  }
}

