import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {StoreService} from '../providers/store.service';

@Injectable()
export class CompetitionGuard implements CanActivate {
  constructor(private storeService: StoreService, private router: Router) {}

  canActivate() {
    const currentId = this.storeService.getCurrent('competition');
    if (!currentId) {
      this.router.navigate(['/competition/welcome']);
      return false;
    }

    return true;
  }
}
