import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { UserService } from '../Services/user.service';
import { AppSettings } from '../Settings/AppSettings';
import { FormGroup, FormControl } from '@angular/forms';
import { Role } from '../Entities/Role';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';
import { ChatService } from '../Services/chat.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:any;
  error: any ;
  @Input() currentUser:any

  constructor(private authService: AuthenticationService,
              private router: Router,
              private userService: UserService,
              private afAuth: AngularFireAuth,
              private afs:AngularFirestore,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private chatService: ChatService,
              ) { }
  
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  
  ngOnInit() {
  }
  
  async onSubmit() {
    if (this.form.valid) {

      this.authService.authenticate(this.form.controls.username.value, this.form.controls.password.value).subscribe(data => {
        console.log(data)

        localStorage.setItem('token', data.token) ;
        this.userService.details(this.form.controls.username.value).subscribe(user => {
          localStorage.setItem('user', JSON.stringify(user)) ;
          AppSettings.details = user ;
          this.email = AppSettings.details.email
          this.currentUser = AppSettings.details
          console.log(this.currentUser)
            if (AppSettings.details.authorities.includes(Role.Admin)) {
              console.log('admin connected') ;
              this.router.navigate(['/options/home/dashboard']) ;
            } else {
              console.log('user connected') ;
              console.log('connected user email'+this.email)
              this.router.navigate(['/options/profile']) ;
            }
          }
        
        ) ;
        },
        error => {
          this.error = error.message;
             console.log(this.error)
        } );
      }
      //this.authService.fireBaseAuth();
      //this.signInToFirebase();
  }

  async signInToFirebase(){
    const loading = await this.loadingController.create();
    await loading.present();
    console.log('firebaseEmail'+this.email)
    this.chatService
      .signIn(this.email,this.form.controls.password.value)
      .then(
        (res) => {
          loading.dismiss();
        },
        async (err) => {
          loading.dismiss();
          const alert = await this.alertController.create({
            message: "Invalid Username or password",
            buttons: ['OK'],
          });
 
          await alert.present();
        }
      );
  }

  
}
