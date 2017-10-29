import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { PerformanceService } from '../services/performace.service';
import { Performance, Session, Availability, Seat } from '../shared/data.model';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit, OnDestroy {
	public subscription: Subscription;
	public performance: Performance;
	@Output() info = new EventEmitter<boolean>();

	constructor(public router: Router, 
		public psv: PerformanceService) {
	}

	ngOnInit(): void {
		this.performance = this.psv.selectedPerformance();
		this.subscription = this.psv.performancesChanged.subscribe(
			() => {			
				this.performance = this.psv.selectedPerformance();
			});
	}

	ngOnDestroy(): void {
		if (this.subscription)
			this.subscription.unsubscribe();
	}

	displayInfo(): void {
		this.info.emit(true);
	}

	getDescription(performance: Performance) {		
		let id = performance.info.findIndex(element => element.key === 'Description');
		if (id < 0)
			return "";
		else 
			return performance.info[id].value || "undefined";
	}

	getBackground() {
		let bg;
		if ((bg = this.performance.Background_url_path) != null) {
			return {'background-image': 'url(' + bg + ')', 'background-size': 'cover'};
		}
	}

	hideInfo(): void {
		this.info.emit(false);	
	}
}
