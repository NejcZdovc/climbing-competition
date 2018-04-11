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
    return this.store[type] || null;
  }

  setCurrent(type: string, id: string) {
    this.store[type] = id;
  }
}
