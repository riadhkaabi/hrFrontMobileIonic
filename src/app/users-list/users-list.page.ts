import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, IonRouterOutlet, IonSearchbar, ModalController, ToastController } from '@ionic/angular';
import { AddUserComponent } from '../add-user/add-user.component';
import { SendTokenComponent } from '../send-token/send-token.component';
import { EmployeeService } from '../Services/employee.service';
import { SharedService } from '../Services/shared.service';
import { UserService } from '../Services/user.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {
  @ViewChild('search', { static: false }) search: IonSearchbar;
  usersList: any = []
  items: any[]
  searchedItem:any;
  employeesList:any=[]
  employeeId : any
  admin: Boolean = this.sharedService.verifyAdmin();

  constructor(public userService: UserService,private employeeService : EmployeeService, public alertController: AlertController , public toastController: ToastController ,private modalController:ModalController,public sharedService: SharedService) {
    this.items = [
      { expanded: false },
    ];

    this.searchedItem = this.usersList
  }
    form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
  });
  ngOnInit() {
    this.getUsers();
    this.getEmployees()

  }

  doRefresh(event){
    console.log('Begin async operation');
    this.getUsers();
    this.getEmployees()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
    

  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.search.setFocus();
    });
  }

   ionChange(event){
    const val = event.target.value;
    this.searchedItem = this.usersList;
    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        console.log(item.firstName)
        return (item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      })
    }
  }

  getUsers() {
    this.userService.findAll().subscribe(data => { 
      this.usersList = data;
      this.searchedItem = data;
      console.log(this.usersList); }
    );
  }
  
  

  async assignAdminRole(user) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Assign this user as admin ?',
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
            this.userService.assignAdminRole(user.id).subscribe(
              (data) => {console.log(data);}
           );
          }
        }
      ]
    });
    await alert.present();
  }

  async openMyModal() {
    const myModal = await this.modalController.create({
      component: SendTokenComponent,
      cssClass: 'my-custom-modal-css'
    });
    return await myModal.present();
  }
  
  async deleteUser(user) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Are you sure you want to Delete this User ?',
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
            console.log(user)
            console.log(this.usersList)
            let index = this.usersList.findIndex(obj => obj.id === user.id)
            this.userService.deleteUserById(user.id).subscribe(
              (data: any) => {
                this.usersList.splice(index, 1)
                console.log("item")
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }

  async updateDeviceUsers(){
      this.employeeService.updateDeviceUsers().subscribe(data=> {
        console.log(data) ;
           }
      );
      const toast = await this.toastController.create({
        message: 'Device Employees list upgraded ',
        duration: 2000,
        color: 'primary',
        position: 'bottom',

      });
      toast.present();
  }
 
  async matchUser(user) {
    var inputArray = [] 
    this.employeesList.forEach(element => {
    inputArray.push({type : 'radio',label :element["empFirstname"], value:element["id"] })
    });
    console.log(this.employeeId)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Match User',
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
          handler: (value) => {
            this.employeeId = value
            console.log("employeeId "+this.employeeId)
            this.matchingUser(user.id)
         
          }
        }
      ]
    });
    alert.inputs = inputArray ;
    await alert.present();
    }
 
    matchingUser(id: number) {
      console.log("matchingUserId "+this.employeeId) ;
      this.userService.matchingUser(id, this.employeeId).subscribe(data=> {
        console.log(data) ;
           }
      );
    }
    getEmployees() {
      this.employeeService.getEmployee().subscribe(data => {
        this.employeesList = data;
         console.log(data) ; 
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
