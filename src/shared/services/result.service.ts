import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ResultService {
    headers: Headers;

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-type', 'application/json');
    }

    getResults(id: number) {
        return this._http.get(
            'http://localhost:8000/api/result/get/all/'+id
        )
        .map(response => response.json());
    }

    saveResults(data: Object) {
        return this._http.put(
            'http://localhost:8000/api/result/update/',
            JSON.stringify(data),
            {headers: this.headers}
        )
        .map(response => response.json());
    }
}
