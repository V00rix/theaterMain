import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	private qParams: String;

	constructor(private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.subscription = this.route
		.queryParams
		.subscribe(params => {
			// Defaults to 0 if no query param provided.
			// console.log(params['perf']);
			this.qParams = params['perf']; 
			console.log(this.qParams);
			
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
