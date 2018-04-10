import {Injectable} from '@angular/core';
import RxDB from 'rxdb/plugins/core';
import * as Database from '../database/types/database';
const uuidv4 = require('uuid/v4');

const collections = [
  {
    name: 'competition',
    schema: require('../database/schema/competition.schema.json')
  },
  {
    name: 'category',
    schema: require('../database/schema/category.schema.json')
  },
  {
    name: 'route',
    schema: require('../database/schema/route.schema.json')
  },
  {
    name: 'competitor',
    schema: require('../database/schema/competitor.schema.json')
  }
];

import RxDBValidateModule from 'rxdb/plugins/validate';
RxDB.plugin(RxDBValidateModule);

// IndexDB
// https://github.com/pouchdb/pouchdb/tree/master/packages/node_modules/pouchdb-adapter-idb
import PouchdbAdapterIdb from 'pouchdb-adapter-idb';
RxDB.plugin(PouchdbAdapterIdb);
const useAdapter = 'idb';

@Injectable()
export class DatabaseService {
  static dbPromise: Promise<Database.DB> = null;

  get(): Promise<Database.DB> {
    if (DatabaseService.dbPromise) {
      return DatabaseService.dbPromise;
    }

    // create database
    DatabaseService.dbPromise = this.create();
    return DatabaseService.dbPromise;
  }

  private async create(): Promise<Database.DB> {
    const db: Database.DB = await RxDB.create({
      name: 'climbing',
      adapter: useAdapter
    });

    window['db'] = db; // write to window for debugging

    // create collections
    await Promise.all(collections.map(colData => db.collection(colData)));

    collections.forEach(colData => {
      db.collections[colData.name].preInsert(function(docObj) {
        if (!docObj.id) {
          docObj.id = uuidv4();
          docObj.createdAt = new Date().getTime();
        }
      });
    });

    return db;
  }
}
