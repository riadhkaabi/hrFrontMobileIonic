import { Injectable } from "@angular/core";

import * as Stomp from 'stompjs';
import * as SockJs from 'sockjs-client';
import { AppSettings } from '../Settings/AppSettings';

@Injectable()
export class WebsocketService {

  // Open connection with the back-end socket
  public connect() {
    let socket = new SockJs('http://'+AppSettings.IP_ADDRESS+':8080/socket');
    let stompClient = Stomp.over(socket);
    stompClient.debug = null
    return stompClient;
  }
}