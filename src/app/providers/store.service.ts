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
      category: 'e2cbdf04-bbe3-451c-8546-99683a13833f',
      competition: '777a92e1-9ab7-4030-b919-ba6d7ef72e57'
    };

    return this.store[type] || test[type] || null; // TODO change this back to dynamic
  }

  setCurrent(type: string, id: string) {
    this.store[type] = id;
  }
}
