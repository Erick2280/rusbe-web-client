import { Component, OnInit } from '@angular/core';
import { TimeService } from '../time.service';
import { VirtusService } from '../virtus.service';
import { FirebaseService } from '../firebase.service';
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
              private firebaseService: FirebaseService,
              private router: Router,
              private route: ActivatedRoute,
              private toastController: ToastController) {}

  timeDataLoaded = false;
  virtusDataLoaded = false;
  firebaseLoggedIn = false;
  firebaseUserData: any;
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

  ionViewWillEnter() {
    this.firebaseService.getLoginStatus().then((data) => {
      if (!!data) {
        this.firebaseLoggedIn = true;
        this.firebaseUserData = data;
      } else {
        this.firebaseLoggedIn = false;
        this.firebaseUserData = null;
      }
    });
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
        this.displayErrorToast('Infelizmente, ocorreu um erro ao tentar atualizar os dados. Puxe para baixo para tentar novamente.');
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
    this.virtusService.clearVirtusData();
    this.updateVirtusData();
    event.target.complete();
  }

}
