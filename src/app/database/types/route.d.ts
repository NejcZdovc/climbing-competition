import {RxCollection, RxDocument} from 'rxdb';

declare interface RouteType {
  id?: string;
  createdAt?: number;
  name?: string;
  routeSetter?: string;
  time?: string;
}

export type RouteDocument = RxDocument<RouteType>;

export class Collection extends RxCollection<RouteType> {
  pouch: any;
}

declare let _default: {
  RouteDocument,
  Collection
};
export default _default;
