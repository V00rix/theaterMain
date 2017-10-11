import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Performance, Session } from '../shared/performance.model';
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
		console.log(this.session.seats.length);
	}

}
