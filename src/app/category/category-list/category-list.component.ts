import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {CompetitionService} from '../../providers/competition.service';
import {CategoryDocument} from '../../database/types/category';
import {DatabaseService} from '../../providers/database.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  currentCompetition: string = null;
  categories: CategoryDocument[];
  sub: any;

  constructor(
    private competitionService: CompetitionService,
    private databaseService: DatabaseService,
    private router: Router,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    this.currentCompetition = this.competitionService.getCurrent();

    console.log(this.currentCompetition); // TODO remove

    this.show();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onView(id: string) {
    this.router.navigate(['/category/details', id]);
  }

  onEdit(id: string) {
    this.router.navigate(['/category/edit', id]);
  }

  onDelete(category: CategoryDocument) {
    const result = confirm(`Are you sure that you would like to delete ${category.name}?`);
    if (result === true) {
      category.remove();
    }
  }

  private async show() {
    const db = await this.databaseService.get();
    const competitions$ = db.category
      .find()
      .where('competitionId').eq(this.currentCompetition)
      .$;

    this.sub = competitions$.subscribe(data => {
      this.categories = data;
      this.zone.run(() => { });
    });
  }
}
