import {NgModule} from "@angular/core";
import {AlertComponent} from "./shared/alert.component";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {PlaceholderDirective} from "./shared/placeholder.directive";
import {DropdownDirective} from "./shared/dropdown.directive";
import {CommonModule} from "@angular/common";
import {LoggingService} from "./logging.service";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  entryComponents: [AlertComponent],
  //providers: [LoggingService] druga instanca, razlicna od onaa vo app-module
})
export class SharedModule{}
