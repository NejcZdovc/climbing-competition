import {RxCollection, RxDocument} from 'rxdb';

declare interface CompetitorType {
  id?: string;
  createdAt?: number;
  firstName?: string;
  lastName?: string;
  club?: string;
  birthYear?: number;
  results?: {
    total: number;
    ranking: number;
    route_1: {
      height: number;
      temp_height: number;
      attempt: boolean;
      top: boolean;
      points: number;
      ranking: number;
    };
    route_2: {
      height: number;
      temp_height: number;
      attempt: boolean;
      top: boolean;
      points: number;
      ranking: number;
    };
    route_3: {
      height: number;
      temp_height: number;
      attempt: boolean;
      top: boolean;
      points: number;
      ranking: number;
    };
    route_4: {
      height: number;
      temp_height: number;
      attempt: boolean;
      top: boolean;
      points: number;
      ranking: number;
    };
  };
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
