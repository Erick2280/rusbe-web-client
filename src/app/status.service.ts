import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class StatusService {
    constructor(public afAuth: AngularFireAuth, private storage: Storage) { }

    doLogin() {
        return new Promise(resolve => {
            var userinfo: {
                name: string,
                email: string,
                photoUrl: string,
                logged: boolean
            }
            this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((res) => {
                console.log(res.user);
                userinfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photoUrl: res.user.photoURL,
                    logged: true
                }
                resolve(userinfo);
            }).catch((res) =>{
                userinfo.logged = false;
                resolve(userinfo);
            });
        });
    }

    clearUserInfo() {
        Promise.all([
            this.storage.remove('user_name'),
            this.storage.remove('user_email'),
            this.storage.remove('user_photoUrl'),
            this.storage.set('user_logged', false)
        ]).then(() => {
            setTimeout(() => { document.location.assign('/home'); }, 500);
        });
    }
}
