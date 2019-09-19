import { Component, OnInit } from '@angular/core';
import { TimeService } from '../time.service';
import { VirtusService } from '../virtus.service';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private timeService: TimeService,
              private virtusService: VirtusService,
              private router: Router,
              private route: ActivatedRoute,
              private toastController: ToastController) {}

  timeDataLoaded = false;
  virtusDataLoaded = false;
  firebaseDataLoaded = false;
  hiddenResource = false;
  timeData: any;
  virtusData: any = {
    data: {
      desjejumParsed: [],
      almocoParsed: [],
      jantarParsed: []
    }
  };
  firebaseData: any;
  slideOpts: any;

  ngOnInit() {
    this.updateTimeData();
    this.determineSlideOpts();
    this.updateVirtusData();
  }

  updateTimeData() {
    this.timeData = this.timeService.getTimeData();
    this.timeDataLoaded = true;
  }

  determineSlideOpts() {
    if (this.timeData.expectedOperation === 'almoco') {
      this.slideOpts = { initialSlide: 1};
    } else if (this.timeData.expectedOperation === 'jantar') {
      this.slideOpts = { initialSlide: 2};
    } else {
      this.slideOpts = { initialSlide: 0};
    }
  }

  updateVirtusData() {
    this.virtusService.getVirtusData(this.timeData).then((data) => {
      this.virtusData = data;
      this.virtusDataLoaded = true;
    }).catch((err) => {
      if (err === 'receivedNullDataFromVirtus') {
        this.displayErrorToast('Infelizmente, o sistema da UFPE não retornou dados. Puxe para baixo para tentar novamente.');
      } else {
        this.displayErrorToast('Infelizmente, ocorreu um erro ao tentar atualizar os dados. Puxe para baixo para tentar novamente.');
      }
    });

  }

  async displayErrorToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'OK'
    });
    toast.present();
  }

  refreshData(event) {

    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
