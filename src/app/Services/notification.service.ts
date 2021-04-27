import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../Settings/AppSettings';
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
export class NotificationService {
  constructor(private httpClient: HttpClient) { }

  public getNotifsByUser() : Observable<any>{
    return this.httpClient.get(AppSettings.NOTIFCATION_URL+ '/'+JSON.parse(localStorage.getItem('user')).id,httpOptions) ;
  }

  public deleteNotificationById(id: number) {
    return this.httpClient.get(AppSettings.NOTIFCATION_URL + '/delete/' + id,{});
  }
  public updateNotification(idNotif:number,idUser:any) {
    return this.httpClient.get(AppSettings.NOTIFCATION_URL + '/setSeen/' + idNotif+'/'+idUser,{});
  }
}
