import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CompetitorService {
    headers: Headers;

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-type', 'application/json');
    }

    getCompetitor(id: number) {
        return this._http.get(
            'http://localhost:8000/api/competitor/get/'+id
        )
        .map(response => response.json());
    }

    getCompetitors(id: number) {
        return this._http.get(
            'http://localhost:8000/api/competitor/get/all/'+id
        )
        .map(response => response.json());
    }

    createCompetitor(data: Object) {
        return this._http.post(
            'http://localhost:8000/api/competitor/create',
            JSON.stringify(data),
            {headers: this.headers}
        )
        .map(response => response.json());
    }

    saveCompetitor(data: Object) {
        return this._http.put(
            'http://localhost:8000/api/competitor/update',
            JSON.stringify(data),
            {headers: this.headers}
        )
        .map(response => response.json());
    }
}
