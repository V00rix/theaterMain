export class Performance {
	constructor(public name: string,
		public description: string,
		public sessions: Session[]) {}
}

export class Session {
	constructor(public time: Date,
		public seats: Seat[][]) {}
}

export class Seat {
	constructor(public availability: Availability) {}
	public fromScreen: number;
	public fromLeft: number;
}

export enum Availability {
	Available,
	Booked,
	Hidden
}