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
    // TODO remove
    const test = {
      category: '413ca252-2307-4f02-b80f-69528275dea1',
      competition: 'f4030e35-bcff-465e-a483-41a6b2c73f92'
    }
    return this.store[type] || test[type] || null;
  }

  setCurrent(type: string, id: string) {
    this.store[type] = id;
  }
}
