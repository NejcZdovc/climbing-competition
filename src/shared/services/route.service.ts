import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RouteService {
    headers: Headers;

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-type', 'application/json');
    }

    getRoute(id: number) {
        return this._http.get(
            'http://localhost:8000/api/route/get/'+id
        )
        .map(response => response.json());
    }

    getRoutes(id: number) {
        return this._http.get(
            'http://localhost:8000/api/route/get/all/'+id
        )
        .map(response => response.json());
    }

    createRoute(data: Object) {
        return this._http.post(
            'http://localhost:8000/api/route/create',
            JSON.stringify(data),
            {headers: this.headers}
        )
        .map(response => response.json());
    }

    saveRoute(data: Object) {
        return this._http.put(
            'http://localhost:8000/api/route/update',
            JSON.stringify(data),
            {headers: this.headers}
        )
        .map(response => response.json());
    }
}
