import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public afAuth: AngularFireAuth, private storage: Storage) { }

    doLogin() {
      return new Promise((resolve, reject) => {
        let userInfo: {
          name: string,
          email: string,
          photoUrl: string,
        };
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((res) => {
          userInfo = {
            name: res.user.displayName,
            email: res.user.email,
            photoUrl: res.user.photoURL,
          };
          this.storage.set('userInfo', userInfo);
          resolve(userInfo);
        }).catch(() => {
          reject(new Error('firebaseLoginError'));
          return;
        });
      });
    }

    getLoginStatus() {
      return new Promise(resolve => {
        this.storage.get('userInfo').then((data) => {
          if (data != null) {
            resolve(data);
          } else {
            resolve(false);
          }
        });
      });
    }

    doLogout() {
      return new Promise(resolve => {
        Promise.all([this.afAuth.auth.signOut(), this.storage.remove('userInfo')]).then(() => {
          resolve();
        });
      });
    }

  }
