import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {CompetitionService} from '../providers/competition.service';

@Injectable()
export class CompetitionGuard implements CanActivate {
  constructor(private competitionService: CompetitionService, private router: Router) {}

  canActivate() {
    const currentId = this.competitionService.getCurrent();
    if (!currentId) {
      this.router.navigate(['/competition/welcome']);
      return false;
    }

    return true;
  }
}
