import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service for sharing data between Angular components using RxJS BehaviorSubject.
 * This service allows setting and getting data that can be observed by multiple components.
 *
 * @typeparam T The type of data to be shared.
 */
@Injectable({
  providedIn: 'root',
})
export class DataSenderService<T = any> {
  // Create a private BehaviorSubject with an initial value of null.
  private data = new BehaviorSubject<T | null>(null);

  /**
   * Observable that components can subscribe to for receiving data updates.
   */
  getData: Observable<T | null> = this.data.asObservable();

  constructor() {}

  /**
   * Sets the data to be shared with components.
   *
   * @param sendingData The data to be shared.
   */
  setData(sendingData: T) {
    this.data.next(sendingData);
  }
}
