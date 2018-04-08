import {RxCollection, RxDocument} from 'rxdb';

declare interface CompetitionType {
  id?: string;
  name?: string;
  dateOf?: string;
  location?: string;
  referee?: string;
}

export type CompetitionDocument = RxDocument<CompetitionType>;

export class Collection extends RxCollection<CompetitionType> {
  pouch: any;
}

declare let _default: {
  CompetitionDocument,
  Collection
};
export default _default;
