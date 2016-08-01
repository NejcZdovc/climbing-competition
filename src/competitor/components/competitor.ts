import {Route} from '../../route/components/route';

export class Competitor {
	id: number;
	firstname: string;
    lastname: string;
    birth: string;
    club: string;
    ranking: number;
    startNumber: number;
    category_id: number;
	routes: Route[];

	constructor(
		Id: number,
		Firstname: string,
		Lastname: string,
		Birth: string,
		Club: string,
		Ranking: number,
		StartNumber: number,
		Category_id: number, Routes: Route[]
	) {
		this.id = Id;
		this.firstname = Firstname;
	    this.lastname = Lastname;
	    this.birth = Birth;
	    this.club = Club;
	    this.ranking = Ranking;
	    this.startNumber = StartNumber;
	    this.category_id = Category_id;
	    this.routes = Routes;
	}
}
