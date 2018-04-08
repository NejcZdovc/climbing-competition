import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {StoreService} from '../providers/store.service';

@Injectable()
export class CategoryGuard implements CanActivate {
  constructor(private storeService: StoreService, private router: Router) {}

  canActivate() {
    const currentId = this.storeService.getCurrent('category');
    if (!currentId) {
      this.router.navigate(['/category/list']);
      return false;
    }

    return true;
  }
}
