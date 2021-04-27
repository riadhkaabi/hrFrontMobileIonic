import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './Services/user.service';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './Services/jwt.interceptor';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { WebsocketService } from './Services/websocket.service';
import { NotificationService } from './Services/notification.service';
import { Camera} from '@ionic-native/camera/ngx';
import { ChartModule } from 'primeng/chart';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import {Deeplinks} from '@ionic-native/deeplinks/ngx'
import {NgxQRCodeModule} from 'ngx-qrcode2'
import { AuthGuard } from './Services/authguard.service';



@NgModule({
  declarations: [AppComponent],
  
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFireAuthModule,
            AngularFirestoreModule,
            HttpClientModule,
            ChartModule,NgxQRCodeModule,
            FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    StatusBar,
    SplashScreen,
    WebsocketService,
    NotificationService,
    UserService,
    Camera,
    FileTransfer,
    File,
    FileTransferObject,AuthGuard,
    Deeplinks,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
