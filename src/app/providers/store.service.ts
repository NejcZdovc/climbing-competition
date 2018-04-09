import {Injectable} from '@angular/core';

interface Store {
  current: {
    category?: string;
    competition?: string;
  };
}

@Injectable()
export class StoreService {
  store: Store = {current: {}};

  getCurrent(type: string): string {
    const test = {
      category: '1224021f-971c-4f8e-99f4-bbf3b6912f09',
      competition: '93f42bce-865d-4063-a92f-c00f0bb0b3b7'
    };

    return this.store[type] || test[type] || null; // TODO change this back to dynamic
  }

  setCurrent(type: string, id: string) {
    this.store[type] = id;
  }
}
