import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
  this.userService.welcomePage("192.168.1.15").subscribe(data =>{
    console.log(data)
  })

  
  }
 
}
