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
			this.performance = this.performanceService.getPerformance(0);
			this.pid = +params['pid'];					
			if (!isNaN(this.pid))  
				this.performance = this.performanceService.getPerformance(this.pid - 1);
			else  {
				console.log("Error in query string!\n\tPerformance id is NaN!");	
				this.pid = 0;			
			}
		});
		this.nextPage();
		setInterval(() => {
			this.nextPage()
		}, 3000);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	nextPage() {
		this.pid = ++this.pid > this.performanceService.getPerformances().length - 2 ? 0 : this.pid;
		this.performance = this.performanceService.getPerformance(this.pid);
		/* TODO 
		TRANSITION ANIMATION
		*/




	}

	onPerformanceClicked() {
		this.router.navigate(['/info'], {queryParams: { pid: this.pid+1 }, relativeTo: this.route});
	}
}
