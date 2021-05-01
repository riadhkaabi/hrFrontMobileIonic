import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ChatService } from '../Services/chat.service';
import { UserService } from '../Services/user.service';
import {Deeplinks} from '@ionic-native/deeplinks/ngx'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  wcode : string = '';
  userFile ;
  public imagePath;
  imgURL: any;
  public message: string;
  public userForm: FormGroup ;
  public error: any ;
  constructor(private route: ActivatedRoute,private userService: UserService,private router: Router,private formBuilder: FormBuilder,private loadingController: LoadingController,
    private chatService: ChatService, private alertController: AlertController,private deeplink:Deeplinks,public toastController: ToastController){
  
    this.userForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.minLength(8)]]
  });
}

ngOnInit() {}
  

  async onSubmit() {
    const loading = await this.loadingController.create();
    if (this.userForm.valid) {
      
       loading.present();
       const user = this.userForm.value ;
       user.firstName = this.userForm.value.firstName ;
       user.lastName = this.userForm.value.lastName ;
       user.email = this.userForm.value.email ;
       user.password = this.userForm.value.password ;
       user.phoneNumber = this.userForm.value.phoneNumber ;
       console.log(user);
       this.userService.validateUser(this.route.snapshot.paramMap.get('token'), user).subscribe(
         async data => {
           console.log("data",data);
            let userId = data['id']
           this.router.navigate(['/add-picture',userId]);

        loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Successfully registered',
          duration: 1000,
          color: 'primary'
        });
        toast.present();

        setTimeout(() => {
            loading.present();
            this.router.navigate(['/login']);
            loading.dismiss();

          }, 3000);


        },
        async error => { this.error = error ;
          const toast = await this.toastController.create({
            message: 'registration Failed contact admin  !',
            duration: 3000,
            color: 'primary'
          });
          toast.present();
        }
       ) ;

    } else {
      const toast = await this.toastController.create({
        message: 'Invalid form !',
        duration: 3000,
        color: 'primary'
      });
    toast.present();
    }

    this.signUpToFireBase();
  }

    signUpToFireBase(){
    
    this.chatService
      .signup(this.userForm.controls.email.value,this.userForm.controls.password.value)
      .then(
         async (user) => {

          console.log('user',user)
          //this.onSubmit()
         
          const toast =  await this.toastController.create({
            message: 'Successfully registered',
            duration: 2000,
            color: 'primary',
            position: 'bottom',

          });
         
          toast.present();
          //this.router.navigateByUrl('/login', { replaceUrl: true });
        },
        async (err) => {
          const alert = await this.alertController.create({
            header: 'Sign up failed',
            message: err.message,
            buttons: ['OK'],
          });
 
          await alert.present();
        }
      );
  }

  
}
