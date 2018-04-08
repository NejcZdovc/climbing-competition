import {Injectable} from '@angular/core';

@Injectable()
export class CompetitionService {
  currentCompetition: string = null;

  getCurrent(): string {
   return this.currentCompetition || '35320d7d-71c0-4f3b-8f1d-91a736201341'; // TODO remove default
  }

  setCurrent(id: string) {
    this.currentCompetition = id;
  }
}
