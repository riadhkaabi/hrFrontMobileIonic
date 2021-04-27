import { Injectable } from '@angular/core';
import { AppSettings } from '../Settings/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  verifyAdmin(): Boolean {
    if (AppSettings.details.authorities.includes('ROLE_ADMIN')) {
     return true ;
    }
     return false ;
}
}
