import { Component, OnInit } from '@angular/core';
import { RuInfoService } from '../ru-info.service';
import { ToastController } from '@ionic/angular';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private ruInfo: RuInfoService,
              private statusService: StatusService,
              public toastController: ToastController) { }

  ngOnInit() {
  }

  clearVirtusData() {
    this.ruInfo.clearVirtusData();
    this.presentVirtusDataClearedToast();
    setTimeout(() => {
    document.location.assign('/home');
      },
      2000);
  }

  clearUserInfo() {
    this.statusService.clearUserInfo();
    setTimeout(() => { document.location.assign('/home'); }, 2000);
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
