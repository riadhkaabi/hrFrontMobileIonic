import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../Settings/AppSettings';
import { Attendance } from '../Entities/Attendance';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpClient: HttpClient) { }
 
  addAttendanceByQrCode(attendance:Attendance) {
    return this.httpClient.post(AppSettings.ATTENDANCE_URL + '/att' , attendance);
  }
  getAll() {
    return this.httpClient.get(AppSettings.ATTENDANCE_URL + '/all') ;
  }
  getAttendanceById(id:number) {
    return this.httpClient.get(AppSettings.ATTENDANCE_URL + '/'+id) ;
  }
  getByMonth() {
    return this.httpClient.get(AppSettings.ATTENDANCE_URL + '/month') ;
  }
  getByToday() {
    return this.httpClient.get(AppSettings.ATTENDANCE_URL + '/today') ;
  }
  count() {
    return this.httpClient.get(AppSettings.ATTENDANCE_URL + '/count');
  }
  setWorkTime(start: String, end: String) {
    return this.httpClient.post(AppSettings.ATTENDANCE_URL + '/time' + `?start=${start}&end=${end}`, {}) ;
 }
 getWorkTime() {
  return this.httpClient.get(AppSettings.ATTENDANCE_URL + '/get/time') ;
}
}
