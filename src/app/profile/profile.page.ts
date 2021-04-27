import { Component, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActionSheetController, IonToggle, ModalController } from '@ionic/angular';
import { QrattendancePage } from '../qrattendance/qrattendance.page';
import { AttendanceService } from '../Services/attendance.service';
import { AuthenticationService } from '../Services/authentication.service';
import { EmployeeService } from '../Services/employee.service';
import { SharedService } from '../Services/shared.service';
import { UserService } from '../Services/user.service';
import { AppSettings } from '../Settings/AppSettings';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  myAttendanceList: any = [];
  currentUser:any;
  today:any;
  holidayState:boolean
  showUser:boolean
  admin: Boolean = this.sharedService.verifyAdmin();


  constructor(private authService : AuthenticationService ,public actionSheetController: ActionSheetController,private modalController:ModalController,private userService:UserService, private employeeService: EmployeeService ,private attendanceSerice : AttendanceService,
     public sharedService: SharedService) { 
    this.currentUser = AppSettings.details;
    this.today = new Date().toISOString().slice(0, 10)
    console.log(this.currentUser)
  }

  ngOnInit() {
    if(!this.admin){
      this.showUser = true
    }
    this.currentUser = AppSettings.details;
    this.getMyAttendaces()
  }

  async displayActionSheet(){

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [ {
        text: 'Log out',
        icon: 'close',
        handler: () => {
          this.logOut();
        }
      }]
    });
    await actionSheet.present();
  }

  doRefresh(event){
    console.log('Begin async operation');
    this.getMyAttendaces()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async openMyModalQrScanner() {
    const myModal = await this.modalController.create({
      component: QrattendancePage,
      cssClass: 'my-custom-Qr-modal-css'
    });
    return await myModal.present();
  }

  activateHoliday(){
    this.userService.CheckHolidayActive(this.currentUser.id).subscribe(data=>{
      this.currentUser.holidayState=1
      console.log("ENABLE")
      localStorage.setItem('user',JSON.stringify(this.currentUser))
    })
    this.holidayState = false
  }
 
 
  disableHoliday(){
    this.userService.CheckHolidayNotActive(this.currentUser.id).subscribe(data=>{
      console.log("DISABLE")
      this.currentUser.holidayState=0
      localStorage.setItem('user',JSON.stringify(this.currentUser))
    })
    this.holidayState = true
  }
   
  getMyAttendaces() {
    this.myAttendanceList=[]
    this.employeeService.getEmployeeByUserId(this.currentUser.id).subscribe(data=>{
    this.attendanceSerice.getAttendanceById(data['0']).subscribe(element => {
       this.myAttendanceList=element
       }
        );
      })
   }


   logOut(){
     this.authService.logout();
   }

}
