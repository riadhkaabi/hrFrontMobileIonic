import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notificationdetail',
  templateUrl: './notificationdetail.component.html',
  styleUrls: ['./notificationdetail.component.scss'],
})
export class NotificationdetailComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismissNotificationDetail(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
