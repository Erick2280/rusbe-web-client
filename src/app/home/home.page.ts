import { Component } from '@angular/core';
import { RuInfoService } from '../ru-info.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private ruInfo: RuInfoService) {}


  test() {
  console.log(this.ruInfo.getTimeData());
  // this.ruInfo.determineRuStatus(this.ruInfo.getTimeData());
  }


}
