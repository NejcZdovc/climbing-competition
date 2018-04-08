import {RxCollection, RxDocument} from 'rxdb';

declare interface CategoryType {
  id?: string;
  createdAt?: number;
  name?: string;
  yearFrom?: number;
  yearTo?: number;
}

export type CategoryDocument = RxDocument<CategoryType>;

export class Collection extends RxCollection<CategoryType> {
  pouch: any;
}

declare let _default: {
  CategoryDocument,
  Collection
};
export default _default;
