import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ModalController, LoadingController } from '@ionic/angular';
import { User } from '../Entities/User';
import { ChatService } from '../Services/chat.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-send-token',
  templateUrl: './send-token.component.html',
  styleUrls: ['./send-token.component.scss'],
})
export class SendTokenComponent implements OnInit {
  
  constructor(public userService: UserService, public alertController: AlertController,public toastController: ToastController,private modalCtrl:ModalController,private fb:FormBuilder,private toastCtrl: ToastController,private loadingController: LoadingController) 
  { 
    
  }


  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      //showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

  ngOnInit() {

    
  }

  credentialForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
  });
  async addUser(){
    if (this.credentialForm.valid) {
      
    //const loading = await this.loadingController.create();
    //await loading.present();
    const user = new User() ;
      user.username = this.credentialForm.controls.username.value;
      user.email = this.credentialForm.controls.email.value;
      this.userService.addUser(user.username, user.email).subscribe(
        async (data) => {
          console.log(data);
          //loading.dismiss();

          const toast = await this.toastController.create({
            message: 'A registration email have been sent !',
            duration: 2000,
            color: '',
            position: 'bottom',

          });
          toast.present();},
      );
      this.closeModal();
   } else {
     alert('form not valid!') ;
   }
  }
  
   closeModal(){
    this.modalCtrl.dismiss(); 
   }
}
