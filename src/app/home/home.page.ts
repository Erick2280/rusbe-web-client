import { Component, OnInit } from '@angular/core';
import { RuInfoService } from '../ru-info.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private ruInfo: RuInfoService,
              private router: Router,
              private route: ActivatedRoute) {}

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

  ngOnInit() {
    this.timeData = this.ruInfo.getTimeData();
    this.timeDataLoaded = true;
    console.log(this.timeData);
    this.ruInfo.getVirtusData(this.ruInfo.getTimeData()).then((data) => {
    this.virtusData = data;
    console.log('front received virtus data');
    if (this.virtusData.data == null) {
      this.virtusData.data.desjejumParsed = this.virtusData.data.desjejum.split(',');
      this.virtusData.data.almocoParsed = this.virtusData.data.almoco.split(',');
      this.virtusData.data.jantar = this.virtusData.data.jantar.split(',');
      this.virtusDataLoaded = true;
    }
    console.log(this.virtusData);

    });
  }

}
