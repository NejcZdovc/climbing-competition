import { RxDatabase } from 'rxdb';
import * as Competition from './competition';
import * as Category from './category';

export class DB extends RxDatabase {
  competition?: Competition.Collection;
  category?: Category.Collection;
}

declare let _default: {
  DB
};

export default _default;
