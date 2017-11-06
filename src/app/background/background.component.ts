import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { PerformanceService } from '../services/performace.service';
import { Performance, Session, Availability, Seat } from '../shared/data.model';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
	private performance$: Observable<any>;
	@Output() info = new EventEmitter<boolean>();

	constructor(public psv: PerformanceService) {
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
		if (performance.info) {	
			let id = performance.info.findIndex(element => element.key === 'Описание');
			if (id < 0)
				return "";
			else 
				return performance.info[id].value || undefined;
		}
		return "";
	}

	getBackground(performance: Performance) {
		let bg;
		if ((bg = performance.Background_url_path) != null && !/^ *$/.test(bg)) {
			return {'background-image': 'url(' + bg + ')', 'background-size': 'cover'};
		}
	}

	hideInfo(): void {
		this.info.emit(false);	
	}
}
