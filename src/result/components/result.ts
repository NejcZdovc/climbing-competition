export class Result {
	id: number;
	height: string;
    attempt: number;
    top: number;
    note: string;
    route_id: number;
    competitor_id: number;

	constructor(Id: number, Height: string, Attempt: number, Top: number, Note: string, Route_id: number, Competitor_id: number) {
		this.id = Id;
		this.height = Height;
	    this.attempt = Attempt;
	    this.top = Top;
	    this.note = Note;
	    this.route_id = Route_id;
	    this.competitor_id = Competitor_id;
    }
}
