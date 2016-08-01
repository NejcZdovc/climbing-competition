import {Result} from '../../result/components/result';

export class Route {
	id: number;
	name: string;
    referee: string;
    routesetter: string;
    time: number;
    category_id: number;
	result: Result;

	constructor(Id: number, Name: string, Referee: string, Routesetter: string, Time: number, Category_id: number, Result: Result) {
		this.id = Id;
		this.name = Name;
	    this.referee = Referee;
	    this.routesetter = Routesetter;
	    this.time = Time;
	    this.category_id = Category_id;
	    this.result = Result;
	}
}
