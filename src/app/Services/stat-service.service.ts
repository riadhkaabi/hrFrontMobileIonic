import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../Settings/AppSettings';


@Injectable({
  providedIn: 'root'
})
export class StatServiceService {

  constructor(private httpClient: HttpClient) { }

  delaysPerDay() {
    return this.httpClient.get(AppSettings.STAT_URL + '/delays') ;
  }

  fetchStatsAttendance() {
    return this.httpClient.get(AppSettings.STAT_URL + '/statsAttedanceDelays') ;
  }

  getByEmployee(id: number, from: string, to: string) {
    return this.httpClient.get(AppSettings.STAT_URL + '/calculate/' + id + '/' + from + '/' + to) ;
  }

  getAll(from: string, to: string) {
    return this.httpClient.get(AppSettings.STAT_URL + '/calculate' + '/all/' + from + '/' + to ) ;
  }
}
