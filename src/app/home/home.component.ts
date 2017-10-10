import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { PerformanceService } from '../services/performace.service';
import { Performance, Session, Availability, Seat } from '../shared/performance.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	private pid: number;
	private performance: Performance;

	constructor(private route: ActivatedRoute,
		private router: Router, 
		private performanceService: PerformanceService) { }

	ngOnInit() {
		this.subscription = this.route
		.queryParams
		.subscribe(params => {
			this.performance = this.performanceService.getPerformances()[0];
			this.pid = +params['pid'];					
			if (!isNaN(this.pid))  
				this.performance = this.performanceService.getPerformance(this.pid - 1);
			else 
				console.log("Error in query string!\n\tPerformance id in NaN!");				
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
