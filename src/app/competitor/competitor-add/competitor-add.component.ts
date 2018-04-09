import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from '../../providers/store.service';
import {DatabaseService} from '../../providers/database.service';
import {CompetitorDocument} from '../../database/types/competitor';

@Component({
  selector: 'app-competitor-add',
  templateUrl: './competitor-add.component.html',
  styleUrls: ['./competitor-add.component.scss']
})
export class CompetitorAddComponent implements OnInit, OnDestroy {
  currentCategory: string = null;
  tempCompetitor: any;
  sub;
  competitors: CompetitorDocument[];

  constructor(
    private databaseService: DatabaseService,
    private storeService: StoreService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.currentCategory = this.storeService.getCurrent('category');
    this.newCompetitor();
  }

  ngOnDestroy () {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  async newCompetitor() {
    const db = await this.databaseService.get();
    // TODO remove defaults
    this.tempCompetitor = db.competitor.newDocument({
      firstName: 'name',
      club: 'test',
      birthYear: 2015
    });
    const competitors$ = db.competitor
      .find()
      .where('categoryId').eq(this.currentCategory)
      .$;

    this.sub = competitors$.subscribe((competitors: CompetitorDocument[]) => {
      this.competitors = competitors;
      this.zone.run(() => {});
    });
  }

  async submit(newDoc) {
    try {
      newDoc.categoryId = this.currentCategory;
      newDoc.results = {
        points: 0,
        ranking: 0,
        route_1: {
          height: 0,
          attempt: false,
          top: false
        },
        route_2: {
          height: 0,
          attempt: false,
          top: false
        }
      };
      newDoc.startNumber = (this.competitors.length + 1) || 1;
      await newDoc.save();
      await this.newCompetitor();
    } catch (err) {
      throw err;
    }
  }
}
