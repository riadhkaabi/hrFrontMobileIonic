import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from '../Settings/AppSettings';
import { User } from '../Entities/User';
import { Observable } from 'rxjs';

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
export class UserService {

  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = AppSettings.USER_URL;
  }

  public validateUser(token: string, user: User) {
    return this.http.post(this.userUrl + '/' + `validate?token=${token}`, user) ;
}
  public addUser(username: string, email: string) {
    return this.http.post<User>(this.userUrl + '/' + `?username=${username}` + `&email=${email}`, {});
  }
  public details(username: String) {
    return this.http.get(this.userUrl + '/details' + `?username=${username}`);
  }
  public findAll(): Observable<User> {
    return this.http.get<User>(this.userUrl + '/');
  }
  public findUserById(id){
    return this.http.get(this.userUrl + '/' + `${id}`);
  }
  public findUserByEmail(email:string){
    return this.http.get(this.userUrl + '/getbyemail/' + `${email}`);
  }
  public deleteUserById(id: number) {
    return this.http.get(this.userUrl + '/delete/' + id);
  }
  public assignAdminRole(id: number) {
    return this.http.post(AppSettings.USER_URL + '/admin/' + id, {}) ;
  }
  public matchingUser(idUser: number, idEmployee: number) {
    return this.http.post(AppSettings.MATCHING_URL + '/' + idUser + `?idEmployee=${idEmployee}`, {});
  }
  public getIdUserByEmployeeId(idEmployee) {
    return this.http.get(AppSettings.MATCHING_URL + '/' + idEmployee + `?idEmployee=${idEmployee}`, {});
  }
  public uploadId(id: number) {
    return this.http.get(AppSettings.URL_UPLOAD_PICTURE + '/' + `?id=${id}`, {});
  }

  public CheckHolidayActive(id: number) {
    return this.http.post(AppSettings.USER_URL + '/holidaystate/' + id,{});
  }
  public CheckHolidayNotActive(id: number) {
    return this.http.post(AppSettings.USER_URL + '/holidaystateNotActive/' + id,{});
  }

}
