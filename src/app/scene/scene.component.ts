import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Performance, Session, Availability } from '../shared/performance.model';
import { PerformanceService } from '../services/performace.service';

@Component({
	selector: 'app-scene',
	templateUrl: './scene.component.html',
	styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {
	private subscription: Subscription;
	private performance: Performance;
	private session: Session;
	private pid: number;
	private sid: number;
	private selectedSeat: Element;

	constructor(private route: ActivatedRoute,
		private psv: PerformanceService) { }

	ngOnInit() {
		this.subscription = this.route
		.queryParams
		.subscribe(params => {
			this.performance = this.psv.getPerformance(0);
			this.pid = +params['pid'];
			this.sid = +params['sid'];					
			if (!isNaN(this.pid))  {
				this.performance = this.psv.getPerformance(this.pid - 1);
				if (!isNaN(this.sid))
					this.session = this.performance.sessions[this.sid - 1];
			}
			else  {
				console.log("Error in query string!\n\tPerformance id is NaN!");	
				this.pid = 0;			
			}
		});
		console.log(this.performance.name);
	}

	private getLongestRow(): number {
		let highestCount = 0;
		for (let row of this.session.seats) {
			if (row.length > highestCount)
				highestCount = row.length;
		}
		return highestCount;
	}

	private getClass(row: number, seat: number) {
		switch (this.session.seats[row][seat].availability) {
			case Availability.Available:
			return { "available" : true};
			case Availability.Booked:
			return { "booked" : true};
			case Availability.Hidden:
			return { "inactive" : true};
		}
	}

	private onSeatSelected(event: Event): void {
		if (event.srcElement.classList.contains("booked") ||
			event.srcElement.classList.contains("inactive"))
			return;
		if (this.selectedSeat != undefined)
			this.selectedSeat.classList.remove("selected");
		this.selectedSeat = event.srcElement;		
		this.selectedSeat.classList.add("selected");
	}
}
