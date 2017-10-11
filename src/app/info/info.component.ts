import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../services/performace.service';
import { Performance } from '../shared/performance.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
	private performance: Performance;
	private pid: number;
	private subscription: Subscription;

	constructor(private psv: PerformanceService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.subscription = this.route
		.queryParams
		.subscribe(params => {
			this.performance = this.psv.getPerformance(0);
			this.pid = +params['pid'];					
			if (!isNaN(this.pid))  
				this.performance = this.psv.getPerformance(this.pid - 1);
			else  {
				console.log("Error in query string!\n\tPerformance id is NaN!");	
				this.pid = 0;			
			}
		});
	}

}
