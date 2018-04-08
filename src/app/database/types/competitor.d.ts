import {RxCollection, RxDocument} from 'rxdb';

declare interface CompetitorType {
  id?: string;
  createdAt?: number;
  firstName?: string;
  lastName?: string;
  club?: string;
  ranking?: number;
  points?: number;
  birthYear?: number;
  startNumber?: number;
}

export type CompetitorDocument = RxDocument<CompetitorType>;

export class Collection extends RxCollection<CompetitorType> {
  pouch: any;
}

declare let _default: {
  CompetitorDocument,
  Collection
};
export default _default;
