import { RxDatabase } from 'rxdb';
import * as Competition from './competition';
import * as Category from './category';
import * as Route from './route';
import * as Competitor from './competitor';

export class DB extends RxDatabase {
  competition?: Competition.Collection;
  category?: Category.Collection;
  route?: Route.Collection;
  competitor?: Competitor.Collection;
}

declare let _default: {
  DB
};

export default _default;
