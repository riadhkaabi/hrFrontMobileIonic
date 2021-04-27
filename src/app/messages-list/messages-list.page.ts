import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AlertController, IonRouterOutlet, IonSearchbar, ModalController, ToastController } from '@ionic/angular';
import { ChatService } from '../Services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { AppSettings } from '../Settings/AppSettings';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.page.html',
  styleUrls: ['./messages-list.page.scss'],
})
export class MessagesListPage implements OnInit {
  @ViewChild('search', { static: false }) search: IonSearchbar;

  users:any=[];
  username:any;
  messages: any=[];
  connectedUser:any;
  fireBaseUser:any;
  searchedItem:any;
  lastMessage:any ;
  loading: HTMLIonLoadingElement = null;

  constructor(private chatService: ChatService, private route: ActivatedRoute,private router: Router,private userService:UserService,private loadingCtrl: LoadingController) {
    
    this.connectedUser=AppSettings.details;
    this.fireBaseUser=JSON.parse(localStorage.getItem('fireBaseUser'));  
    this.searchedItem = this.users
  }

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
    
    this.chatService.getChatList().subscribe((value) => {
         this.users=[];
         console.log(value)

         value.forEach(element => {
         if(element.uid !== JSON.parse(localStorage.getItem('fireBaseUser')).uid){
         this.userService.findUserByEmail(element.email).subscribe(data=>{
         element['firstName']=data['firstName'];
         element['lastName']=data['lastName'];
         element['username']=data['username']
         element['photo']=data['photo']
         element.messages = []

         this.chatService.getChatMessages().subscribe(messages => {
          messages.forEach(message => {
            if(message.from === element.uid || message.to === element.uid){
              element.messages = [...element.messages , message]
            }
          })
          element.lastMessage = element.messages && element.messages.length ? element.messages[element.messages.length - 1] : null
          console.log("last message",element.lastMessage)
        })
        })
        this.users.push(element);
        this.searchedItem = this.users
      }
       });
      });
      
      this.chatService.getChatMessages().subscribe(data=>{
        console.log(data)
         this.messages=[];
         data.forEach(element => {
           if((element['from'] === this.fireBaseUser.uid)){
            this.messages.push(element)
            console.log(this.messages)
             this.lastMessage = this.messages[this.messages.length-1];  
                 }
         });
         this.loading.dismiss();
         this.loading = null;
      })
     
  }

  displayMessages(selectedUser){
    console.log(selectedUser)
    this.userService.details(selectedUser.username).subscribe(user => {
      console.log('details', user);
     this.router.navigate(['/messages',selectedUser.uid]);
      }
    )}
    
    ionChange(event){
      const val = event.target.value;
      this.searchedItem = this.users;
      if (val && val.trim() != '') {
        this.searchedItem = this.searchedItem.filter((item: any) => {
          console.log(item.firstName)
          return (item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

}
