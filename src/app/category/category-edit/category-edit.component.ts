import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatabaseService} from '../../providers/database.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  category: any;
  sub: any;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router
  ) { }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.getDocument();
  }

  async submit(newDoc) {
    try {
      await newDoc.save();
      this.router.navigate(['/category/list']);
    } catch (err) {
      throw err;
    }
  }

  private async getDocument() {
    const id = this.route.snapshot.paramMap.get('id');
    const db = await this.databaseService.get();

    const obs$ = db.category
      .findOne()
      .where('id').eq(id)
      .$;

    this.sub = obs$.subscribe(data => {
      this.category = data;
      this.zone.run(() => { });
    });
  }
}
