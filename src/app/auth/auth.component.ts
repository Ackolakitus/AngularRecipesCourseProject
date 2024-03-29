import {Component, ComponentFactoryResolver, OnDestroy} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
// import {AlertComponent} from "../shared/alert.component";
// import {PlaceholderDirective} from "../shared/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  // @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  // private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid)
      return;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.login(email, password)
    }
    else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        //this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });
    form.reset();
  }

  onCloseError(){
    this.error = null;
  }

  // private showErrorAlert(message: string){
  //   //const alertCmp = new AlertComponent(); OVA NE E VALID ANGULAR CODE
  //   const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();
  //
  //   const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
  //
  //   componentRef.instance.message = message;
  //   this.closeSub = componentRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });
  // }

  ngOnDestroy() {
    // if (this.closeSub){
    //   this.closeSub.unsubscribe();
    // }
  }
}
