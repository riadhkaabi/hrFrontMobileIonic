import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from '../Services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../Settings/AppSettings';
import * as firebase from 'firebase';
import { UserService } from '../Services/user.service';
 
@Component({
  selector: 'app-chat',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
 
  messages: any=[];
  newMsg = '';
  destionationUser:any;
  destionationUserUID:any;
  connectedUser:any;
  fireBaseUser:any;
  constructor(private userService:UserService,private chatService: ChatService, private route: ActivatedRoute,private router: Router) { 

    this.route.params.subscribe(params => {
      this.destionationUserUID=params['uid']
    });
    this.connectedUser=AppSettings.details;
    this.fireBaseUser=JSON.parse(localStorage.getItem('fireBaseUser'));

  }
 
  ngOnInit() {

       this.chatService.getChatMessages().subscribe(data=>{
       this.messages=[];
       data.forEach(element => {
        if((element['from'] === this.destionationUserUID && element['to'] === this.fireBaseUser.uid) || (element['to'] === this.destionationUserUID && element['from'] === this.fireBaseUser.uid) ){
     
          this.userService.findUserByEmail(element['fromName']).subscribe(data=>{
            element['firstName']=data['firstName'];  
            element['lastName']=data['lastName'];
            element['photo']=data['photo'];
            element['myUserId']=data['uid']
            })
           this.messages.push(element) 

        }
       });
       console.log(this.messages) 

       let lastMessage = this.messages && this.messages.length ? this.messages[this.messages.length - 1] : null
       console.log("last message",lastMessage)
       if(lastMessage !== null && lastMessage.to === this.destionationUserUID){
         lastMessage.isSeen = true
         //update service fb

       }
    })
  }
 
  sendMessage() {
    let newMsg={
      msg: this.newMsg,
      from: JSON.parse(localStorage.getItem('fireBaseUser')).uid,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
      to:this.destionationUserUID,
      isSeen: false
    }
    this.chatService.addChatMessage(newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }
 
  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
  backToMessages(){
    this.router.navigate(['/options/messages-list']);
  }
}