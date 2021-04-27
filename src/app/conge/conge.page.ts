import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Leave } from '../Entities/Leave';
import { LeaveService } from '../Services/leave.service';
import { MessageService } from 'primeng/api';
import { AppSettings } from '../Settings/AppSettings';
import { AlertController, ToastController } from '@ionic/angular';
import { SharedService } from '../Services/shared.service';


@Component({
  selector: 'app-conge',
  templateUrl: './conge.page.html',
  styleUrls: ['./conge.page.scss'],
  providers: [MessageService]

})
export class CongePage implements OnInit {
  today;
  public cards: any = [];
  public items: any = [];
  public its: any[];
  holidayForm: FormGroup;
  showDiv:any
  showUserDiv:any;
  reasons: any[] = ['Sickness', 'Vacation', 'Personal', 'Maternity'];
  pendingHolidays: any[];
  assignedHolidays: any[];
  confirmedUserHoliday:any=[];
  currentUser:any;
  constructor(private formBuilder: FormBuilder, private leaveService: LeaveService, public toastController: ToastController, public sharedService: SharedService,
    public alertController: AlertController) {
    this.today = new Date().toISOString().slice(0, 10)
    this.items = [{ expanded: false },];
    this.its = [{ expanded: false },];
    this.currentUser = AppSettings.details;

  }
  admin: Boolean = this.sharedService.verifyAdmin();

  ngOnInit() {
    this.currentUser = AppSettings.details;
    console.log(this.currentUser.id)
    console.log(this.today)
    this.holidayForm = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
    if (this.admin) {
      this.getPending();
      this.getAssigned();
      this.showDiv = true
    }else{
      this.showUserDiv = true ;
      this.getMyConfirmedHolidays();
    }

    
  }
  async onSubmit() {
    if (this.holidayForm.valid) {
    if(this.holidayForm.value.fromDate > this.holidayForm.value.toDate || this.holidayForm.value.fromDate < this.today || this.holidayForm.value.toDate < this.today){
      const toast = await this.toastController.create({
        message: 'Choose dates correctly !',
        duration: 2000,
        color: 'primary'
      });
      toast.present();
    }else{

      const leave = new Leave();
      leave.fromDate = new Date(this.holidayForm.value.fromDate);
      leave.toDate = new Date(this.holidayForm.value.toDate);
      leave.reason = this.holidayForm.value.reason;
      console.log(leave.fromDate)
      console.log(leave.toDate)
      console.log(leave.reason)


      this.leaveService.addLeave(AppSettings.details.id, leave).subscribe(async data => {
        console.log(data);
        const toast = await this.toastController.create({
          message: 'your request has been sent',
          duration: 2000,
          color: 'primary !',
          position: 'bottom',

        });
        toast.present();
      });
    }
      } else {
        const toast = await this.toastController.create({
          message: 'Invalid Form',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
      
  }


  getPending() {
    this.leaveService.getPending().subscribe(
      (data: any) => {
        console.log(data);
        this.pendingHolidays = data;
      }
    );
  }

  getPendingByReason() {
    //this.pendingHolidays = [];
    this.leaveService.getPendingByReason().subscribe(
        (data: any) => {
        console.log(data);
        this.pendingHolidays = data;
      }
    );
  }
  getPendingByClosetsDate() {
    //this.pendingHolidays = [];
    this.leaveService.getPendingByClosetsDate().subscribe(
      (data: any) => {
        console.log(data);
        this.pendingHolidays = data;
      }
    );
  }
  getPendingByAlphabetics() {
    //this.pendingHolidays = [];
    this.leaveService.getPendingByAlphabetics().subscribe(
      (data: any) => {
        console.log(data);
        this.pendingHolidays = data;
      }
    );
  }

  getMyConfirmedHolidays(){
    this.leaveService.getConfirmedById(this.currentUser.id).subscribe(data =>{
      console.log(data);
      this.confirmedUserHoliday=data;
    })
  }

  getAssigned() {
    this.leaveService.getAssigned().subscribe(
      (data: any) => {
        console.log(data);
        this.assignedHolidays = data;
      }
    );
  }
  getAssignedReason() {
    this.leaveService.getAssignedByReason().subscribe(
      (data: any) => {
        console.log(data);
        this.assignedHolidays = data;
      }
    );
  }
  getAssignedClosetstDate() {
    this.leaveService.getAssignedClosestDate().subscribe(
      (data: any) => {
        console.log(data);
        this.assignedHolidays = data;
      }
    );
  }
  getAssignedAlphabetics() {
    this.leaveService.getAssignedAlphabetics().subscribe(
      (data: any) => {
        console.log(data);
        this.assignedHolidays = data;
      }
    );
  }
  async rejectHoliday(holiday) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Are you sure you want to Refuse this holiday ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            let index = this.pendingHolidays.findIndex(obj => obj.idHoliday === holiday.idHoliday)
            this.leaveService.reject(holiday.idHoliday).subscribe(
              (data: any) => {
                this.pendingHolidays.splice(index, 1)
                console.log("item")
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmHoliday(holiday) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Are you sure you want to confirm this holiday ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            let index = this.pendingHolidays.findIndex(obj => obj.idHoliday === holiday.idHoliday)
            this.pendingHolidays.splice(index, 1);
            this.leaveService.confirm(holiday.idHoliday).subscribe(
              (data: any) => {
                this.assignedHolidays.push(holiday)
                console.log(data);
              }
            );
            console.log("index==" + index);
          }
        }
      ]
    });

    await alert.present();
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
  expandItemAssigned(item){
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.its.map(listItem => {
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
