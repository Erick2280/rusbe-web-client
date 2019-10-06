import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as environment from './environment.json';

@Injectable({
  providedIn: 'root'
})
export class VirtusService {

  constructor(private http: HttpClient, private storage: Storage) { }

  getVirtusData(timeData: any) {
    // TODO: Pegar informação da semana toda, e verificar se existe a informação do dia no pack da semana
    // Sensibilizar a mudanças depois de estar salvo na db
    return new Promise((resolve, reject) => {

      const today = timeData.day;

      this.storage.get('virtusData').then((virtusData) => {
        if (virtusData === null || virtusData.lastUpdate !== today) {
            const dayToGet = today.replace(/\//ig, '%2F');

            this.http.get(`${environment.virtusApiUrl}?data=${dayToGet}`).subscribe(data => {
              const newVirtusData: any = data;
              newVirtusData.lastUpdate = today;
              if (newVirtusData.data !== null) {
                newVirtusData.data.desjejumParsed = newVirtusData.data.desjejum.split(',');
                newVirtusData.data.almocoParsed = newVirtusData.data.almoco.split(',');
                newVirtusData.data.jantarParsed = newVirtusData.data.jantar.split(',');
              } else {
                if (timeData.operates) {
                  reject(new Error('receivedNullDataFromVirtus'));
                  return;
                }
              }
              newVirtusData.lastUpdate = today;
              this.storage.set('virtusData', newVirtusData).then(() => {
                resolve(newVirtusData);
              });
            });
        } else {
          resolve(virtusData);
        }
      });
    });
  }

  /*
  updateVirtusData(timeData: any) {
    // separar as lógicas comuns ao get e ao update para reutilizar código
    return new Promise(resolve => {

      const today = timeData.day;
      const dayToGet = today.replace(/\//ig, '%2F');

      this.http.get(`${environment.virtusApiUrl}?data=${dayToGet}`).subscribe(data => {
        const newVirtusData: any = data;
        newVirtusData.lastUpdate = today;
        if (newVirtusData.data !== null) {
          newVirtusData.data.desjejumParsed = newVirtusData.data.desjejum.split(',');
          newVirtusData.data.almocoParsed = newVirtusData.data.almoco.split(',');
          newVirtusData.data.jantarParsed = newVirtusData.data.jantar.split(',');
        } else {
          this.storage.get('virtusData').then((virtusData) => {
            if (virtusData !== null) {
              resolve(virtusData);
            } else {
              throw new Error('receivedNullDataFromVirtus');
            }
          });
        }
        newVirtusData.lastUpdate = today;
        this.storage.set('virtusData', newVirtusData).then(() => {
          resolve(newVirtusData);
        });
      });

    });
  }
  */

  clearVirtusData() {
    this.storage.remove('virtusData');
  }


}
