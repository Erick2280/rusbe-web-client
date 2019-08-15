import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Injectable({
  providedIn: 'root'
})
export class RuInfoService {

  constructor(private http: HttpClient, private storage: Storage) { }

  getTimeData() {
    let isOpen: boolean;
    let expectedOperation = 'none';
    const ruTimes = {
      startDesjejum: moment('07:00', 'hh:mm'),
      endDesjejum: moment('08:00', 'hh:mm'),
      startAlmoco: moment('10:30', 'hh:mm'),
      endAlmoco: moment('14:30', 'hh:mm'),
      startJantar: moment('17:00', 'hh:mm'),
      endJantar: moment('19:00', 'hh:mm')
    };

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
    const data = {
      day: moment().format('L'),
      daySentence: moment().format('LL'),
      weekday: moment().format('dddd').toLowerCase(),
      isOpen: isOpen,
      expectedOperation: expectedOperation
    };
    return data;
  }

  determineRuStatus() {
    // verifica se há dado na api, se houver ele mostra disponibilidade, se não, se for dia da semana ele diz que está disponível
    // se o dado for do dia, não puxar novamente
    return new Promise(resolve => {
      // headers = headers.append('appid', '54f28c840f29309ea1af2802');
      // headers = headers.append('secret', '7fad38e3638028445b27e883f7265614ad0346a852a68489c23f0f3906471fe6');
      let dayToGet = '15/08/2019'.replace('/', '%2F'); // data.day.replace('/', '%2F');
      this.http.get(`https://virtus.ufpe.br/api/v1.0/cardapio/dia?data=${dayToGet}`).subscribe(data => {
          resolve(data);
          console.log('ru status determined');
          console.log(data)
        });
      
    });
  }

  forceDataFlush() {
    // flusheia o dado do dia e o retrieva novamente
    console.log('data flushed');
  }


}
