import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { PerformanceService } from '../services/performace.service';
import { Performance, Session, Availability, Seat } from '../shared/data.model';
import 'rxjs/add/observable/fromEventPattern'

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
	public perf$: Observable<{}>;
	private performance$: Observable<any>;
	@Output() info = new EventEmitter<boolean>();

	constructor(public router: Router, 
		public psv: PerformanceService) {
	}

	ngOnInit(): void {
		this.performance$ = this.psv.performancesChanged.map(() => 
			{ 
				return this.psv.selectedPerformance();
			});
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

	getBackground(performance: Performance) {
		let bg;
		if ((bg = performance.Background_url_path) != null) {
			return {'background-image': 'url(' + bg + ')', 'background-size': 'cover'};
		}
	}

	hideInfo(): void {
		this.info.emit(false);	
	}
}
