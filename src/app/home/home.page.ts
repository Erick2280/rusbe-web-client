import { Component, OnInit } from '@angular/core';
import { TimeService } from '../time.service';
import { VirtusService } from '../virtus.service';
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
    });

  }

}
