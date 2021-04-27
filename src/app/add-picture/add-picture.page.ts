import { Component, OnInit } from '@angular/core';
import { Camera , CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { UserService } from '../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.page.html',
  styleUrls: ['./add-picture.page.scss'],
})
export class AddPicturePage implements OnInit {
imgURL :any 
realImage:any
userId:any
constructor(public navCtrl: NavController,private http: HttpClient,private userService:UserService,
  private transfer: FileTransfer,private route: ActivatedRoute,private router: Router,
  private camera: Camera,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) { 

    this.route.params.subscribe(params => {
      this.userId=params['userId']
    });

}
  ngOnInit() {
    this.getCamera()
  }

  getCamera(){
    this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.CAMERA,
      destinationType:this.camera.DestinationType.DATA_URL}).then((res)=>{
        this.imgURL = 'data:image/jpeg;base64,' + res;
        this.realImage = res;
        console.log(res);
    }).catch(e =>{
      console.log(e);
    })
  }

  getGallery(){
    this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType:this.camera.DestinationType.DATA_URL}).then((res)=>{
        this.imgURL = 'data:image/jpeg;base64,' + res;
        this.realImage = res;
    }).catch(e =>{
      console.log(e);
    })
  }

  uploadImage(){
  
    const fileTransfer: FileTransferObject = this.transfer.create();
     let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: '.png',
      chunkedMode: false,
      
     }
  
     console.log(this.realImage)
     fileTransfer.upload(this.imgURL, 'http://192.168.1.63:80/upload.php', options).then((data) => {
        // success
        console.log(data+"Uploaded Successfully")
        let res = data;
          if (res['success']) {
            console.log('True');
          }
    alert("success");
  }, (err) => {
    // error
    alert("error"+JSON.stringify(err));
  });

this.userService.uploadId(this.userId).subscribe(data =>{
  console.log(data);
})
}
  


}
