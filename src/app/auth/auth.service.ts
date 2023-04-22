import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

export interface AuthResponseData{
  idToken:	string
  email:	string
  refreshToken:	string
  expiresIn:	string
  localId:	string
  registered?: boolean;
}
@Injectable({providedIn: 'root'})
export class AuthService{
  //user = new Subject<User>();
  user = new BehaviorSubject<User>(null);
  //token: string = null;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }
  signup(email: string, password: string){
     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(responseData =>
     {
      this.handleAuthentication(responseData.email,
        responseData.localId,
        responseData.idToken,
        +responseData.expiresIn);
     })
     );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user))
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError( this.handleError), tap(responseData =>
    {
      this.handleAuthentication(responseData.email,
        responseData.localId,
        responseData.idToken,
        +responseData.expiresIn);
    }));
  }

  autoLogIn(){
    const userdata: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userdata){
      return;
    }
    const loadedUser = new User(userdata.email, userdata.id, userdata._token, new Date(userdata._tokenExpirationDate));

    if (loadedUser.token){
        this.user.next(loadedUser);
        const expirationDuration = new Date(userdata._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
    }
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage: string = 'An unknown error occured!';
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message)
    {
      case "EMAIL_NOT_FOUND": errorMessage = 'Email was not found!'; break;
      case "INVALID_PASSWORD": errorMessage = "Incorrect password!"; break;
      case "USER_DISABLED": errorMessage = "Account disabled!"; break;
      case "EMAIL_EXISTS": errorMessage = 'This email exists already!'; break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER": errorMessage = "Too many attempts, try again later!"; break;
    }
    return throwError(errorMessage);
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if ((this.tokenExpirationTimer)) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    },expirationDuration);
  }
}
