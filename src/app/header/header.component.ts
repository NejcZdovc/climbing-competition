import {Component, OnInit} from '@angular/core';
import {StoreService} from '../providers/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  competition = false;
  category = false;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.competition = !!this.storeService.getCurrent('competition');
    this.category = !!this.storeService.getCurrent('category');
  }
}
