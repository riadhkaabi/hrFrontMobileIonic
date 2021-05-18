import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastController, LoadingController, Platform, ModalController } from '@ionic/angular';
import { AppSettings } from '../Settings/AppSettings';
import jsQR from 'jsqr';
import { EmployeeService } from '../Services/employee.service';
import { Attendance } from '../Entities/Attendance';
import { AttendanceService } from '../Services/attendance.service';
import * as Moment from 'moment';
import 'moment-timezone';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-qrattendance',
  templateUrl: './qrattendance.page.html',
  styleUrls: ['./qrattendance.page.scss'],
})
export class QrattendancePage  {
 
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;
  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult = null;
  today:any
  loading: HTMLIonLoadingElement = null;
  currentUser:any
  admin: Boolean = this.sharedService.verifyAdmin();
  qrval = "Riadh"
  tt:any

  qrData = null;
  cc = null;
  constructor(private modalCtrl:ModalController,public sharedService: SharedService,private attendanceService:AttendanceService ,private employeeService:EmployeeService,private toastCtrl: ToastController,private loadingCtrl: LoadingController,private plt: Platform) { 
      const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('android') && isInStandaloneMode()) {
      console.log('I am a an android PWA!');
      // E.g. hide the scan functionality!
    }
    }
    ngAfterViewInit() {
      this.canvasElement = this.canvas.nativeElement;
      this.canvasContext = this.canvasElement.getContext('2d');
      this.videoElement = this.video.nativeElement;
    }
   
    createCode(){
      this.cc = this.qrData
    }
  ngOnInit() {
    console.log(Moment(new Date(), "YYYY-MM-DD hh:mm:ss").toDate())
    let r = Math.random().toString(36).substring(7);
    console.log("random", r);
    console.log(this.qrval)
    this.startScan();
  }

  /*createCode(){
  this .createdCode = this.qrData
  }*/

// Helper functions
async showQrToast() {
  const toast = await this.toastCtrl.create({
    message: `Access Confirmed`,
    position: 'top',
    buttons: [
      {
        text: 'Dismiss',
        role:'cancel',
        handler: () => {
         // window.open(this.scanResult, '_system', 'location=yes');
        }
      }
    ]
  });
  toast.present();
}

reset() {
  this.scanResult = null;
  this.startScan();
}

stopScan() {
  this.scanActive = false;
  this.closeModal();
}
async startScan() {
  // Not working on iOS standalone mode!
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' }
  });
 
  this.videoElement.srcObject = stream;
  // Required for Safari
  this.videoElement.setAttribute('playsinline', true);
 
  this.loading = await this.loadingCtrl.create({});
  await this.loading.present();
 
  this.videoElement.play();
  requestAnimationFrame(this.scan.bind(this));
}
 
async scan() {
  if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
      this.scanActive = true;
    }
 
    this.canvasElement.height = this.videoElement.videoHeight;
    this.canvasElement.width = this.videoElement.videoWidth;
 
    this.canvasContext.drawImage(
      this.videoElement,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    const imageData = this.canvasContext.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });
 
    if (code) {

      this.scanActive = false;
      this.scanResult = code.data;
      var now = new Date();
      
      //if(this.scanResult === this.qrval){
        this.currentUser = AppSettings.details;
      console.log(this.currentUser.id)

      this.employeeService.getEmployeeByUserId(this.currentUser.id).subscribe(data=>{
        console.log(data['0']);
        const attendance = new Attendance(); 
        var today = new Date();
        today.setHours(today.getHours() + 1);
        today.setHours(today.getHours());

        attendance.punchTime = today; 
        attendance.empId = data['0']
        this.tt = today
        this.attendanceService.addAttendanceByQrCode(attendance).subscribe(element =>{
          console.log(element)

        })
      })
     
      

      this.showQrToast();
    } else {
      if (this.scanActive) {
        requestAnimationFrame(this.scan.bind(this));
      }
    }
  } else {
    requestAnimationFrame(this.scan.bind(this));
  }
}

captureImage() {
  this.fileinput.nativeElement.click();
}


handleFile(files: FileList) {
  const file = files.item(0);
 
  var img = new Image();
  img.onload = () => {
    this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
    const imageData = this.canvasContext.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });
 
    if (code) {
      this.scanResult = code.data;
      this.showQrToast();
    }
  };
  img.src = URL.createObjectURL(file);
}
closeModal(){
  this.modalCtrl.dismiss(); 
 }
 
}