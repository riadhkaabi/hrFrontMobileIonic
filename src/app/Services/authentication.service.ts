import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Token } from '../Entities/token';
import { AppSettings } from '../Settings/AppSettings';
import { AngularFireAuth } from '@angular/fire/auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT',
    'Access-Control-Allow-Origin': '*',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private afAuth: AngularFireAuth,private http: HttpClient, private router: Router) { }
 
  public authenticate(user: String, password: String): Observable<Token> {
    return this.http.post<Token>(AppSettings.USER_URL + '/login' + `?username=${user}&password=${password}`,httpOptions);
  }
  
  loggedIn(){
    return localStorage.getItem('token')
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fireBaseUser');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  public fireBaseAuth(){
    this.afAuth.onAuthStateChanged((user) => {
        localStorage.setItem('fireBaseUser',JSON.stringify(user))
       // this.currentUser = user;      
      });
  }
}
