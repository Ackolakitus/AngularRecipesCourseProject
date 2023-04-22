import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared.module";
import {LoggingService} from "../logging.service";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: ShoppingListComponent}
    ]),
    SharedModule,
    FormsModule,
  ],
  // providers: [LoggingService] druga instanca, razlicna od onaa vo app-module
})
export class ShoppingListModule{}
