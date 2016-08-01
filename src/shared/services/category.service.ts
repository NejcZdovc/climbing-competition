import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {
    headers: Headers;

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-type', 'application/json');
    }

    getCategory(id: number) {
        return this._http.get(
            'http://localhost:8000/api/category/get/'+id
        )
        .map(response => response.json());
    }

    getCategories() {
        return this._http.get(
            'http://localhost:8000/api/category/get/all'
        )
        .map(response => response.json());
    }

    createCategory(data: Object) {
        return this._http.post(
            'http://localhost:8000/api/category/create',
            JSON.stringify(data),
            {headers: this.headers}
        )
        .map(response => response.json());
    }

    saveCategory(data: Object) {
        return this._http.put(
            'http://localhost:8000/api/category/update',
            JSON.stringify(data),
            {headers: this.headers}
        )
        .map(response => response.json());
    }
}
