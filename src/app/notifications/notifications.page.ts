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

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.page.html",
  styleUrls: ["./notifications.page.scss"],
})
export class NotificationsPage implements OnInit {
  myNotification: any = [];
  notificationBadge: any = 0;

  stompClient = this.webSocketService.connect();
  constructor(
    private notificationService: NotificationService,
    private webSocketService: WebsocketService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getNotification();
    this.notificationBadge = +1;
    console.log(this.notificationBadge);
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
          let notifId = JSON.parse(message.body).idNotification
          let index = that.myNotification.findIndex(x => x.idNotification === notifId);
          let result = that.myNotification.find(obj => {
            return obj.idNotification === JSON.parse(message.body).idNotification
          })
          if(result === undefined ){
            that.myNotification.push(JSON.parse(message.body));
          }else{
            var foundIndex = that.myNotification.findIndex(item => item.idNotification == result.idNotification);
            that.myNotification[foundIndex].seen = 1
            that.myNotification[foundIndex] = JSON.parse(message.body)
          }
         
        });
      }
    );
    console.log(this.notificationBadge);
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
  }
}
