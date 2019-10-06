import { Component, OnInit } from '@angular/core';
import { VirtusService } from '../virtus.service';
import { FirebaseService } from '../firebase.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private virtusService: VirtusService,
              private firebaseService: FirebaseService,
              public toastController: ToastController) { }

  firebaseLoggedIn = false;
  firebaseLoggingIn = false;
  firebaseUserData: any;


  ngOnInit() {
    this.firebaseService.getLoginStatus().then((data) => {
      if (!!data) {
        this.firebaseLoggedIn = true;
        this.firebaseUserData = data;
      }
    });
  }

  doLogin() {
      this.firebaseLoggingIn = true;
      this.firebaseService.doLogin().then(data => {
        this.firebaseLoggingIn = false;
        this.firebaseLoggedIn = true;
        this.firebaseUserData = data;
      }).catch(err => {
        this.firebaseLoggingIn = false;
        this.presentLoginErrorToast();
      });
  }

  doLogout() {
    this.firebaseService.doLogout().then(() => {
      this.firebaseLoggedIn = false;
      this.presentLogoutToast();
    });
}

  clearVirtusData() {
    this.virtusService.clearVirtusData();
    this.presentVirtusDataClearedToast();
    setTimeout(() => {
    document.location.assign('/home');
      },
      3000);
    }

    async presentLoginErrorToast() {
      const toast = await this.toastController.create({
        message: 'Infelizmente, ocorreu um erro ao tentar realizar login. Por favor, tente novamente.',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'OK'
      });
      toast.present();
    }

    async presentLogoutToast() {
      const toast = await this.toastController.create({
        message: 'Você foi deslogado do Rusbé com sucesso. Esperamos vê-lo em breve!',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'OK'
      });
      toast.present();
    }

  async presentVirtusDataClearedToast() {
    const toast = await this.toastController.create({
      message: 'Os dados da API do RU foram limpos. O Rusbé será recarregado em instantes.',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'OK'
    });
    toast.present();
  }

}
