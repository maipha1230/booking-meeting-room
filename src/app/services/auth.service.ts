import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private jwtHelper: JwtHelperService, private router: Router) { }


  isAdminLogin(): boolean{
    const token = localStorage.getItem(environment.login_token)
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
       let decode = this.jwtHelper.decodeToken(token);
       if (decode.role_id == 1) {
          return true;
       } else {
        return false;
       }
      } else {
        localStorage.removeItem(environment.login_token)
        return false;
      }
    } else {
      return false;

    }
  }

  isUserLogin(): boolean{
    const token = localStorage.getItem(environment.login_token)
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
       let decode = this.jwtHelper.decodeToken(token);
       if (decode.role_id == 2) {
          return true;
       } else {
        return false;
       }
      } else {
        localStorage.removeItem(environment.login_token)
        return false;
      }
    } else {
      return false;

    }
  }


  onLogout(){
    localStorage.removeItem(environment.login_token);
    this,this.router.navigate(['/login'])
  }

}
