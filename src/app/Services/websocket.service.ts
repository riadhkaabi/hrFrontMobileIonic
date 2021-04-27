import { Injectable } from "@angular/core";

import * as Stomp from 'stompjs';
import * as SockJs from 'sockjs-client';

@Injectable()
export class WebsocketService {

  // Open connection with the back-end socket
  public connect() {
    let socket = new SockJs(`http://192.168.1.17:8080/socket`);
    let stompClient = Stomp.over(socket);
    stompClient.debug = null
    return stompClient;
  }
}