import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StoreService} from '../../providers/store.service';
import {DatabaseService} from '../../providers/database.service';

@Component({
  selector: 'app-competitor-edit',
  templateUrl: './competitor-edit.component.html',
  styleUrls: ['./competitor-edit.component.scss']
})
export class CompetitorEditComponent implements OnInit, OnDestroy {
  competitor: any;
  sub: any;
  currentCategory: string;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
    private storeService: StoreService
  ) {
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit() {
    this.currentCategory = this.storeService.getCurrent('category');
    this.getCompetitior();
  }

  async submit(newDoc) {
    try {
      await newDoc.save();
      this.router.navigate(['/category/details', this.currentCategory]);
    } catch (err) {
      throw err;
    }
  }

  private async getCompetitior() {
    const id = this.route.snapshot.paramMap.get('id');
    const db = await this.databaseService.get();

    const obs$ = db.competitor
      .findOne()
      .where('id').eq(id)
      .$;

    this.sub = obs$.subscribe(data => {
      this.competitor = data;
      this.zone.run(() => {
      });
    });
  }
}
