import {Ingredient} from "../shared/ingredient.model";
import {Action} from "rxjs/internal/scheduler/Action";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 3),
    new Ingredient('Tomatoes', 6),
  ]
};
export function shoppingListReducer(state = initialState, action: Action<any>){
  switch (action.type)
}
