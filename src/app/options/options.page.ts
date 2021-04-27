import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../Services/notification.service";
import { SharedService } from "../Services/shared.service";
import { WebsocketService } from "../Services/websocket.service";
import { AppSettings } from "../Settings/AppSettings";

@Component({
  selector: "app-options",
  templateUrl: "./options.page.html",
  styleUrls: ["./options.page.scss"],
})
export class OptionsPage implements OnInit {
  showIconAdmin: any;
  showIconUser: any;
  countMsg: number = 0;
  public admin: Boolean = this.sharedService.verifyAdmin();
  stompClient = this.webSocketService.connect();
  constructor(
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private webSocketService: WebsocketService
  ) {}
  myNotification: any = [];
  ngOnInit() {
    this.notificationService.getNotifsByUser().subscribe((data) => {
      data.forEach((element) => {
        this.myNotification.push(element);
        if (element.isSeen === 0) {
          this.countMsg += 1;
        }
      });
    });

    if (this.admin) {
      this.showIconAdmin = true;
    } else {
      this.showIconUser = true;
    }
  }

  getNotification() {
    let that = this;
    this.stompClient.connect(
      { user: AppSettings.details.username.toString() },
      function (frame) {
        that.stompClient.subscribe("/user/queue/reply", function (message) {

          let result = that.myNotification.find(
            (obj) => {
              return (
                obj.idNotification === JSON.parse(message.body).idNotification
              );
            }
          );
          if (result !== undefined) {
            var foundIndex = that.myNotification.findIndex(
              (item) => item.idNotification == result.idNotification
            );
            that.myNotification[foundIndex].seen = 1;
            that.countMsg--;
            that.myNotification[foundIndex] = JSON.parse(message.body);
          }
        });
      }
    );
  }
}
