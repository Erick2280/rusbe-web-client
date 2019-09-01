import { Component, OnInit } from '@angular/core';
import { VirtusService } from '../virtus.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private virtusService: VirtusService,
              public toastController: ToastController) { }

  ngOnInit() {
  }

  clearVirtusData() {
    this.virtusService.clearVirtusData();
    this.presentVirtusDataClearedToast();
    setTimeout(() => {
    document.location.assign('/home');
      },
      3000);
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
