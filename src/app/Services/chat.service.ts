
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../Entities/User';
import { AppSettings } from '../Settings/AppSettings';

export interface Message {
  createdAt: firebase.default.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
  to:string;
  isSeen:boolean;

}
 
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User = null;
 
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
 
  }
 
  async signup(email, password): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
 
    const uid = credential.user.uid;
 
    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email,
    })
  }
 
  signIn( email, password ) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
 
  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
 
  // Chat functionality
 
 
  addChatMessage(newMsg) {
    return this.afs.collection('messages').add(newMsg);
  }
 /* updateChatMessage(newMsg) {
    return this.afs.collection(this.collectionName + '/' + recordID).update(newMsg);
  }*/
   
  getChatMessages() {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map(messages => {
        for (let m of messages) {          
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = JSON.parse(localStorage.getItem('fireBaseUser')).uid === m.from ;
                }        
        return messages
      })
    )
  }
   
  getChatList() {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map(messages => {
        for (let m of messages) {          
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = JSON.parse(localStorage.getItem('fireBaseUser')).uid === m.from;
        }        
        return users
      })
    )
  }
 
  private getUsers() {
    return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }
   
  private getUserForMsg(msgFromId, users: User[]): string {    
    for (let usr of users) {
      if (usr.uid == msgFromId) {
        return usr.email;
      }
    }
  }
}