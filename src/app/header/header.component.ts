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
	private subscriptions: Subscription[];

	constructor(private psv: PerformanceService,
		private router: Router) { }

	ngOnInit() {
		this.subscriptions[0] = this.psv.performanceChanged.subscribe(
			({performance, id}) => {
				this.performanceName = performance.name;
			});
		this.subscriptions[1] = this.psv.sessionChanged.subscribe(
			({session, id}) => {
				this.sessionDate = session.time;
			});
	}

	ngOnDestroy() {
		this.subscriptions.forEach(value => value.unsubscribe());
	}

	private onGoHome() {
		this.router.navigate(['/'], {queryParams: {pid: 1}});
	}

	private selectedSection(section: Section): number {
		switch (section) {
			case Section.Performance:
				return 0;
			case Section.Session:
				return 1;
			case Section.Session:
				return 2;
		}
	} 

}

enum Section {
	Performance, // at /<perfName>	(Info)
	Session,	// at /<perfName>/<session> (Scene)
	Book
}