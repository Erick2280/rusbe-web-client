import { Component, OnInit } from '@angular/core';
import { Storage} from '@ionic/storage';
import { RuInfoService } from '../ru-info.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private ruInfo: RuInfoService,
              private router: Router,
              private route: ActivatedRoute,
              private status: StatusService,
              private storage: Storage) {}

  timeDataLoaded = false;
  virtusDataLoaded = false;
  hiddenResource = false;
  timeData: any;
  virtusData: any = {
    data: {
      desjejumParsed: [],
      almocoParsed: [],
      jantarParsed: []
    }
  };
  firebaseDataLoaded: any = {
    user: {
      name: null,
      photoUrl: null,
      logged: false
    }
  };
  slideOpts: any;

  ngOnInit() {
    this.timeData = this.ruInfo.getTimeData();
    this.timeDataLoaded = true;
    this.determineSlideOpts();
    this.ruInfo.getVirtusData(this.ruInfo.getTimeData()).then((data) => {
      this.virtusData = data;
      if (this.virtusData.data !== null) {
        this.virtusData.data.desjejumParsed = this.virtusData.data.desjejum.split(',');
        this.virtusData.data.almocoParsed = this.virtusData.data.almoco.split(',');
        this.virtusData.data.jantarParsed = this.virtusData.data.jantar.split(',');
        this.virtusDataLoaded = true;
      }
    });

    this.setUserInfo();
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

  login() {
    console.log('Logging in');
    this.status.doLogin().then(result => {
      console.log(result);
      const received: any = result;
      this.storage.set('user_name', received.name);
      this.storage.set('user_email', received.email);
      this.storage.set('user_photoUrl', received.photoUrl);
      this.storage.set('user_logged', received.logged);
      this.setUserInfo();
      setTimeout(() => { document.location.assign('/home'); }, 500);
    });
  }

  logout() {
    this.status.clearUserInfo();
  }

  setUserInfo() {
    this.storage.get('user_photoUrl').then((val) => {
      this.firebaseDataLoaded.user.photoUrl = val;
    });

    this.storage.get('user_logged').then((val) => {
      this.firebaseDataLoaded.user.logged = val;
    });

    this.storage.get('user_name').then((val) => {
      this.firebaseDataLoaded.user.name = val;
    });
    console.log(this.firebaseDataLoaded.user);
  }

}
