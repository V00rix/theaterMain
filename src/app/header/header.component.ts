import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PerformanceService } from '../services/performace.service';
import { Subscription } from 'rxjs/Rx';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
	private performanceName: string;
	private sessionDate: Date;
	// this should be read from router params etc.
	private inBookingSection: boolean;
	private subscription: Subscription;

	constructor(private psv: PerformanceService,
		private router: Router) { }

	ngOnInit() {
		this.subscription = this.router.events.subscribe(event => {
			if(event instanceof NavigationStart) {
				this.performanceName = this.psv.selectedPerformance().name;
				this.sessionDate = this.psv.selectedSession().time;
			}
		});

		this.subscription = this.psv.performanceChanged.subscribe(
			({performance, id}) => {
				this.performanceName = performance.name;
			});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onGoHome() {
		this.router.navigate(['/home'], {queryParams: {pid: 1}});
	}

}