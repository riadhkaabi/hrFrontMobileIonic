import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from '../Services/authentication.service';
import { UserService } from '../Services/user.service';
import { AppSettings } from '../Settings/AppSettings';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentUser:any;
  navigate : any;
  homePage= "";
  constructor(private platform:Platform,
    private splashScreen:SplashScreen,
    private statusBar:StatusBar,
    private router: Router,
    private authService:AuthenticationService) 
    {
     this.sideMenu();
     this.initializeApp();
    }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.homePage = this.router.url;
    this.currentUser = AppSettings.details;
    console.log(this.currentUser)
  } 
   
  sideMenu(){
    this.navigate =
    [
      {
        title : "Attendance",
        url   : "/options/home/attendance-users",
        icon  : "flash"
      },
      {
        title : "Holidys",
        url   : "/options/home/conge",
        icon  : "calendar-outline"
      },
      {
        title : "Users",
        url   : "/options/home/users-list",
        icon  : "bar-chart-outline"
      },
      
    ]
  }

  logout(){
    console.log("LOGEDOUT")
    this.authService.logout()
  }
}
