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
    let isOpen = false;
    let expectedOperation = 'none';
    let nextMeaningfulEvent: any = 'none';
    let timeUntilNextMeaningfulEvent: any = 'none';
    let operates: boolean;
    const ruTimes = {
      startDesjejum: moment('07:00', 'hh:mm'),
      endDesjejum: moment('08:00', 'hh:mm'),
      startAlmoco: moment('10:30', 'hh:mm'),
      endAlmoco: moment('14:30', 'hh:mm'),
      startJantar: moment('17:00', 'hh:mm'),
      endJantar: moment('19:00', 'hh:mm')
    };
    if (!(moment().weekday() === 0 || moment().weekday() === 6)) {
      operates = true;
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

      if (isOpen) {
        if (expectedOperation === 'desjejum') {
          nextMeaningfulEvent = ruTimes.endDesjejum;
        } else if (expectedOperation === 'almoco') {
          nextMeaningfulEvent = ruTimes.endAlmoco;
        } else if (expectedOperation === 'jantar') {
          nextMeaningfulEvent = ruTimes.endJantar;
        }
      } else {
        if (expectedOperation === 'desjejum') {
          nextMeaningfulEvent = ruTimes.startDesjejum;
        } else if (expectedOperation === 'almoco') {
          nextMeaningfulEvent = ruTimes.startAlmoco;
        } else if (expectedOperation === 'jantar') {
          nextMeaningfulEvent = ruTimes.startJantar;
        }
      }
    } else {
      operates = false;
    }

    if (nextMeaningfulEvent !== 'none') {
      timeUntilNextMeaningfulEvent = nextMeaningfulEvent.fromNow();
    }

    const data = {
      day: moment().format('L'),
      time: moment().format('LT'),
      daySentence: moment().format('LL').toLowerCase(),
      weekday: moment().format('dddd').toLowerCase(),
      operates: operates,
      isOpen: isOpen,
      expectedOperation: expectedOperation,
      nextMeaningfulEvent: nextMeaningfulEvent,
      timeUntilNextMeaningfulEvent: timeUntilNextMeaningfulEvent
    };
    return data;
  }

  getVirtusData(timeData: any) {
    // verifica se há dado na api, se houver ele mostra disponibilidade, se não, se for dia da semana ele diz que está disponível
    // verifica se o servidor não está retornando um dado vazio
    return new Promise(resolve => {

      const today = timeData.day;

      this.storage.get('virtusData').then((virtusData) => {
        if (virtusData === null || virtusData.lastUpdate !== today) {
            const dayToGet = today.replace(/\//ig, '%2F');

            this.http.get(`${environment.virtusApiUrl}?data=${dayToGet}`).subscribe(data => {
              const lastUpdate = 'lastUpdate';
              data[lastUpdate] = today;
              console.log('virtus status determined using api');
              console.log(data);
              this.storage.set('virtusData', data).then(() => {
                console.log('virtus status saved');
                resolve(data);
              });
            });
        } else {
          console.log('virtus data retrieved from local db');
          resolve(virtusData);
        }
      });
    });
  }

  clearVirtusData() {
    this.storage.remove('virtusData');
    console.log('virtus data cleared');
  }


}
