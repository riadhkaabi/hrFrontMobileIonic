import { Component, OnInit } from "@angular/core";
import { WebsocketService } from "../Services/websocket.service";
import { AppSettings } from "../Settings/AppSettings";
import {
  AlertController,
  ToastController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { NotificationdetailComponent } from "../notificationdetail/notificationdetail.component";
import { NotificationService } from "../Services/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.page.html",
  styleUrls: ["./notifications.page.scss"],
})
export class NotificationsPage implements OnInit {
  myNotification: any = [];

  stompClient = this.webSocketService.connect();
  constructor(
    private notificationService: NotificationService,
    private webSocketService: WebsocketService,
    private modalController: ModalController,
    private router:Router
  ) {}

  ngOnInit() {
    this.getNotification();
   //
  
    this.notificationService.getNotifsByUser().subscribe((data) => {
      data.forEach((element) => {
        this.myNotification.push(element);
       
      });
    });
  }

  doRefresh(event){
    console.log('Begin async operation');
    this.getNotification();
    
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getNotification() {
    let that = this;
    console.log(AppSettings.details.username.toString());
    this.stompClient.connect(
      { user: AppSettings.details.username.toString() },
      function (frame) {
        that.stompClient.subscribe("/user/queue/reply", function (message) {

          if(message.body === "DELETED"){

          }else{

        let result = that.myNotification.find(obj => {
            return obj.idNotification === JSON.parse(message.body).idNotification
          })
        
          if(result === undefined ){
            that.myNotification.push(JSON.parse(message.body));
       
          }
          else{
            var foundIndex = that.myNotification.findIndex(item => item.idNotification == result.idNotification);
            that.myNotification[foundIndex].seen = 1
            that.myNotification[foundIndex] = JSON.parse(message.body)
          }
          }
          

         
        });
      }
    );

  }

  
  deleteNotification(notification) {
    let index = this.myNotification.findIndex(
      (obj) => obj.idNotification === notification.idNotification
    );
    this.notificationService
      .deleteNotificationById(notification.idNotification)
      .subscribe((data: any) => {
        this.myNotification.splice(index, 1);
      });
  }

  updateNotification(notificationToUpdate){
    notificationToUpdate.isSeen=1;
    this.notificationService.updateNotification(notificationToUpdate.idNotification,AppSettings.details.id).subscribe((data: any) =>{
        console.log(data)
    })
    this.router.navigate(['/options/home/conge']) ;

  }
}
