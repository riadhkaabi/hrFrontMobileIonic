import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../Settings/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getEmployee() {
    return this.httpClient.get(AppSettings.EMPLOYEE_URL + '/');
  }
  getEmployeeByUserId(idUser) {
    return this.httpClient.get(AppSettings.MATCHING_URL + '/' + idUser + `?idUser=${idUser}`, {});
  }
  updateDeviceUsers(){
    return this.httpClient.get(AppSettings.EMPLOYEE_Device_URL + '/employees')
  }
  count() {
    return this.httpClient.get(AppSettings.EMPLOYEE_URL + '/count');

  }

}
