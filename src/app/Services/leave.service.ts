import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../Settings/AppSettings';
import { Leave } from '../Entities/Leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private httpClient: HttpClient) { }

  public getPending() {
    return this.httpClient.get(AppSettings.LEAVE_URL + '/pending') ;
  }
  public getPendingByReason() {
    return this.httpClient.get(AppSettings.LEAVE_URL + '/reason') ;
  }
  public getPendingByClosetsDate() {
    return this.httpClient.get(AppSettings.LEAVE_URL + '/closetDate') ;
  }
  public getPendingByAlphabetics() {
    return this.httpClient.get(AppSettings.LEAVE_URL + '/alphabetics') ;
  }
  public getAssigned() {
    return this.httpClient.get(AppSettings.LEAVE_URL + '/assigned') ;
  }
  public getAssignedByReason() {
    return this.httpClient.get(AppSettings.LEAVE_URL + '/assignedReason') ;
  }
  public getAssignedAlphabetics() {
    return this.httpClient.get(AppSettings.LEAVE_URL + '/assignedAlphabetics') ;
  }
  public getAssignedClosestDate() {
    return this.httpClient.get(AppSettings.LEAVE_URL + '/assignedClosestDate') ;
  }

  public confirm(id: number) {
    return this.httpClient.post(AppSettings.LEAVE_URL + '/confirm/' + id, {});
  }
  public reject(id: number) {
    return this.httpClient.get(AppSettings.LEAVE_URL + '/reject/' + id,);
  }

  public countPending() {
    return this.httpClient.get(AppSettings.LEAVE_URL + '/count') ;
  }

public addLeave(id: number, leave: Leave) {
  return this.httpClient.post(AppSettings.LEAVE_URL + '/' + id, leave);
}

public getConfirmedById(id: number) {
  return this.httpClient.get(AppSettings.LEAVE_URL + '/confirmed/' + id);
}
public getPendingById(id: number) {
  return this.httpClient.get(AppSettings.LEAVE_URL + '/pending/' + id);
}
}
