import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {DatabaseService} from '../../providers/database.service';
import {CompetitionDocument} from '../../database/types/competition';
import {StoreService} from '../../providers/store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-competition-home',
  templateUrl: './competition-home.component.html',
  styleUrls: ['./competition-home.component.scss']
})
export class CompetitionHomeComponent implements OnInit, OnDestroy {
  competitions: CompetitionDocument[];
  sub: any;

  constructor(
    private databaseService: DatabaseService,
    private zone: NgZone,
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCompetitions();
    this.storeService.setCurrent('competition', null);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onView(id: string) {
    this.storeService.setCurrent('competition', id);
    this.router.navigate(['/category/list']);
  }

  onDelete(competition: CompetitionDocument) {
    const result = confirm(`Are you sure that you would like to delete ${competition.name}?`);
    if (result === true) {
      competition.remove();
    }
  }

  private async getCompetitions() {
    const db = await this.databaseService.get();
    const competitions$ = db.competition
      .find()
      .$;

    this.sub = competitions$.subscribe(heroes => {
      this.competitions = heroes;
      this.zone.run(() => { });
    });
  }
}
