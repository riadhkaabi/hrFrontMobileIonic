import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ChatService } from '../Services/chat.service';
import { UserService } from '../Services/user.service';
//import{ Deeplinks } from '@ionic-native/deeplinks/ngx'

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
    private chatService: ChatService, private alertController: AlertController){
  
    this.userForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.minLength(8)]]
  });
}

ngOnInit() {}
onSubmit() {
    if (this.userForm.valid) {
       const user = this.userForm.value ;
       user.firstName = this.userForm.value.firstName ;
       user.lastName = this.userForm.value.lastName ;
       user.email = this.userForm.value.email ;
       user.password = this.userForm.value.password ;
       user.phoneNumber = this.userForm.value.phoneNumber ;
       console.log(user);
       this.userService.validateUser(this.route.snapshot.paramMap.get('token'), user).subscribe(
         data => {
            console.log(data['id']) ;
            let userId = data['id']
          this.router.navigate(['/add-picture',userId]);
        },
        error => { this.error = error ; }
       ) ;

    } else {
      alert('form not valid!') ;
    }

    this.signUpToFireBase();
  }

  async signUpToFireBase(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.chatService
      .signup(this.userForm.controls.email.value,this.userForm.controls.password.value)
      .then(
        (user) => {
          loading.dismiss();
          //this.router.navigateByUrl('/login', { replaceUrl: true });
        },
        async (err) => {
          loading.dismiss();
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
