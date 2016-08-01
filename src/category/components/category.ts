export class Category {
	id: number;
	name: string;
    yearTo: number;
    yearFrom: number;
    competition_id: number;

	constructor(Id: number, Name: string, YearTo: number, YearFrom: number, Competition_id: number) {
		this.id = Id;
		this.name = Name;
	    this.yearTo = YearTo;
	    this.yearFrom = YearFrom;
	    this.competition_id = Competition_id;
	}
}
