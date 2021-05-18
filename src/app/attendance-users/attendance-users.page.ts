import { JsonpClientBackend } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonRouterOutlet, IonSearchbar, ModalController, ToastController } from '@ionic/angular';
import { AttendanceService } from '../Services/attendance.service';
import { UserService } from '../Services/user.service';
@Component({
  selector: 'app-attendance-users',
  templateUrl: './attendance-users.page.html',
  styleUrls: ['./attendance-users.page.scss'],
})
export class AttendanceUsersPage implements OnInit {

  @ViewChild('search', { static: false }) search: IonSearchbar;
  attendanceList: any = [];
  items: any[];
  searchedItem: any = [];
  today;
  constructor(private attendanceSerice : AttendanceService,private route: ActivatedRoute,private router: Router,private userService:UserService, public alertController: AlertController,public toastController: ToastController ,private modalController:ModalController) {
    this.items = [{ expanded: false },];

    this.searchedItem = this.attendanceList;
    this.getByToday();
    this.today = new Date().toISOString().slice(0, 10)


  }
  ngOnInit() {
    
  }
  
  ionViewDidEnter() {
    setTimeout(() => {
      this.search.setFocus();
    });
  }

   ionChange(event){
    const val = event.target.value;
    this.searchedItem = this.attendanceList;
    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return (item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      })
    }
  }
  
  doRefresh(event){
    console.log('Begin async operation');
    this.getByToday();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getAllAttendace() {
  this.attendanceList=[]
  this.attendanceSerice.getAll().subscribe(data => {
    console.log(data)
     for (let index = 0; index < data['length']; index++) {
       const element = data[index];
      let item={
        'firstName':element[0],
        'lastName':element[1],
        'photo':element[2],
        'workState':element[3],
        'punchTime':new Date(new Date(element[4]).setHours(new Date(element[4]).getHours()-1))
      }
      this.attendanceList.push(item)
      this.searchedItem = this.attendanceList
       console.log(this.attendanceList)
     }
    });
  }
  
getByToday() {
  this.attendanceList=[]
  this.attendanceSerice.getByToday().subscribe(data => {
    console.log(data)
    for (let index = 0; index < data['length']; index++) {
      const element = data[index];
     let item={
      'firstName':element[0],
      'lastName':element[1],
      'photo':element[2],
      'workState':element[3],
      'punchTime':new Date(new Date(element[4]).setHours(new Date(element[4]).getHours()-1))
    }
     this.attendanceList.push(item)
     this.searchedItem = this.attendanceList
      console.log(this.searchedItem)

    }  
  }) ;
  } 
getByMonth() {
   this.attendanceList=[]
   this.attendanceSerice.getByMonth().subscribe(data => {
    for (let index = 0; index < data['length']; index++) {
      const element = data[index];
     let item={
      'firstName':element[0],
      'lastName':element[1],
      'photo':element[2],
      'workState':element[3],
      'punchTime':new Date(new Date(element[4]).setHours(new Date(element[4]).getHours()-1))
    }
     this.attendanceList.push(item)
     this.searchedItem = this.attendanceList
     console.log(this.searchedItem)

    } 
    }
    );
}

expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
    
  }
}
