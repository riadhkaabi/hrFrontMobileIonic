import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AppSettings } from '../Settings/AppSettings';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router , private authentication :AuthenticationService) {}

    canActivate():boolean {
      if(this.authentication.loggedIn()){
        console.log(this.authentication.loggedIn())
        return true
      }
        this.router.navigate(['/login'])
      return true  
    }
}

