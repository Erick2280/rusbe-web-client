import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as environment from './environment.json';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Injectable({
  providedIn: 'root'
})
export class RuInfoService {

  constructor(private http: HttpClient, private storage: Storage) { }

  getTimeData() {
    let isOpen: boolean = false;
    let expectedOperation = 'none';
    const ruTimes = {
      startDesjejum: moment('07:00', 'hh:mm'),
      endDesjejum: moment('08:00', 'hh:mm'),
      startAlmoco: moment('10:30', 'hh:mm'),
      endAlmoco: moment('14:30', 'hh:mm'),
      startJantar: moment('17:00', 'hh:mm'),
      endJantar: moment('19:00', 'hh:mm')
    };
    if (!(moment().weekday() == 0 || moment().weekday() == 6)) {
      if (moment().isBefore(ruTimes.endDesjejum)) {
        expectedOperation = 'desjejum';
        isOpen = moment().isAfter(ruTimes.startDesjejum);
      } else if (moment().isBefore(ruTimes.endAlmoco)) {
        expectedOperation = 'almoco';
        isOpen = moment().isAfter(ruTimes.startAlmoco);
      } else if (moment().isBefore(ruTimes.endJantar)) {
        expectedOperation = 'jantar';
        isOpen = moment().isAfter(ruTimes.startJantar);
      }
    }
    const data = {
      day: moment().format('L'),
      daySentence: moment().format('LL'),
      weekday: moment().format('dddd').toLowerCase(),
      isOpen: isOpen,
      expectedOperation: expectedOperation
    };
    return data;
  }

  determineRuStatus(timeData: any) {
    // verifica se há dado na api, se houver ele mostra disponibilidade, se não, se for dia da semana ele diz que está disponível

    return new Promise(resolve => {
      
      let today = moment().format('L');

      this.storage.get('virtusData').then((virtusData) => {
        if (virtusData === null || virtusData.lastUpdate != today) {
            let dayToGet = today.replace(/\//ig, '%2F');

            this.http.get(`${environment.virtusApiUrl}?data=${dayToGet}`).subscribe(data => {
              // salvar dado do dia (com dia inserido) e retornar
              resolve(data);
              
              this.storage.set('virtusData', data)
              console.log('ru status determined');
              console.log(data)
            });   
        }
      });
    });
  }

  forceDataFlush() {
    // flusheia o dado do dia e o retrieva novamente
    console.log('data flushed');
  }


}
