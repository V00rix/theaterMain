import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Performance, Session, Seat, Viewer, Availability } from '../shared/data.model';
import { PerformanceService } from '../services/performace.service';
import { Animations } from '../animations/animations';

@Component({
	selector: 'app-scene',
	templateUrl: './scene.component.html',
	styleUrls: ['./scene.component.scss'],
	animations: [
		Animations.inOpacityScale, Animations.slideIn, Animations.fadeIn
	]
})
export class SceneComponent implements OnInit, OnDestroy {
	public performanceName: string;
	public session: Session;
	public subscription: Subscription;
	public selectedSeats = []; // as DOM Elements 
	public seats = []; // for fields component
	public fields = false;
	public zoomFactor = 1;
	@Output() scene = new EventEmitter<boolean>();
	@Output() message = new EventEmitter<boolean>();
	@ViewChild('scrollElement') scrollElement;

	constructor(public route: ActivatedRoute,
		public psv: PerformanceService) { }

	ngOnInit(): void {
		this.performanceName = this.psv.selectedPerformance().Performance_name;
		this.session = this.psv.selectedSession();
		this.subscription = this.psv.performancesChanged.subscribe(
			() => {
				this.performanceName = this.psv.selectedPerformance().Performance_name;
				this.session = this.psv.selectedSession();
			});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public getLongestRow(): number {		
		let highestCount = 0;
		for (let row of this.session.seats) {
			if (row.length > highestCount)
				highestCount = row.length;
		}
		return highestCount;
	}

	public getClass(row: number, seat: number) {
		switch (this.session.seats[row][seat].availability) {
			case Availability.Hidden:
			return { "inactive" : true};
			case Availability.Booked:
			return { "booked" : true};
			case Availability.Pending:
			return { "pending" : true};
			case Availability.Available:
			return { "available" : true};
		}
	}

	/* Select seats, add to/remove from array */
	public onSeatSelected(event: Event, row: number, seat: number): void {
		if (event.srcElement.classList.contains("booked") ||
			event.srcElement.classList.contains("pending") ||
			event.srcElement.classList.contains("inactive"))
			return;
		var index: number = this.selectedSeats.indexOf(event.srcElement, 0);
		if (index > -1) {
			event.srcElement.classList.remove("selected");
			this.selectedSeats.splice(index, 1);
			this.seats.splice(index, 1);
		}
		else {
			event.srcElement.classList.add("selected");			
			this.selectedSeats.push(event.srcElement);
			var s = this.session.seats[row][seat];
			s.fromScreen = this.session.seats.length - row;
			s.fromLeft = seat + 1;
			if (!s.viewer)
				s.viewer = new Viewer();
			this.seats.push(s);			
		}
	}

	displayFields(display: boolean): void {
		this.fields = this.seats.length && display;
	}

	displayMessage(display: boolean) {
		this.message.emit(display);
	}

	changePerformance(pid: number): void {
		this.selectedSeats = [];
		this.psv.selectPerformance(pid);
		this.psv.selectSession(0);
	}

	changeSession(sid: number): void {
		this.selectedSeats = [];
		this.psv.selectSession(sid);
	}

	cancelSeat(event) {
		var index: number = this.seats.indexOf(event, 0);
		if (index > -1) {
			this.seats.splice(index, 1);
			this.selectedSeats[index].classList.remove("selected");
			this.selectedSeats.splice(index, 1);
		}
		if (this.seats.length === 0) {
			this.fields = false;
		}
	}

	goBack(): void {
		this.selectedSeats = [];
		this.scene.emit(false);
	}

	onScroll(value: number, event) {
		let el = <HTMLElement>this.scrollElement.nativeElement;
		// console.log(window.scroll);
		// console.log(event);
		// console.log(Math.floor(event.offsetX / el.offsetWidth * 100) + "% " 
			// + Math.floor(event.offsetY / el.offsetHeight * 100) + "%");
		if (this.zoomFactor+value >= 1 && this.zoomFactor+value <= 2.5) {
			// console.log("scroll to" + (el.offsetHeight / this.zoomFactor));
			// el.scrollBy(0, el.offsetHeight / this.zoomFactor  / 2);
			this.zoomFactor += value;
			// console.log(<HTMLElement>this.scrollElement);
			
		}
	}

	smallScreen() {
		return (window.innerWidth < 992);
	}
}
