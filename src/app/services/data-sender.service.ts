import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSenderService<T = any> {

  private data = new BehaviorSubject<T | null>(null);
  getData = this.data.asObservable();
  
  constructor() { }

  setData(sendingData: T){
    this.data.next(sendingData);
  }
}
