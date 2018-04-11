import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatabaseService} from '../../providers/database.service';

@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.scss']
})
export class CompetitionEditComponent implements OnInit, OnDestroy {
  competition: any;
  sub: any;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router
  ) { }

  ngOnDestroy () {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit() {
    this.getCompetition();
  }

  async submit(newDoc) {
    try {
      await newDoc.save();
      this.router.navigate(['/competition/welcome']);
    } catch (err) {
      throw err;
    }
  }

  private async getCompetition() {
    const competitionId = this.route.snapshot.paramMap.get('id');
    const db = await this.databaseService.get();

    const competitions$ = db.competition
      .findOne()
      .where('id').eq(competitionId)
      .$;

    this.sub = competitions$.subscribe(data => {
      this.competition = data;
      this.zone.run(() => { });
    });

    // this.editDoc$ = fromPromise(db.competition
    //   .findOne()
    //   .where('id').eq(this.competitionId)
    //   .exec());
  }
}
