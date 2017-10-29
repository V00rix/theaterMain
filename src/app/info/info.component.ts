import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { PerformanceService } from '../services/performace.service';
import { Performance, Session } from '../shared/data.model';
import { Subscription } from 'rxjs/Subscription';
import { Animations } from '../animations/animations';

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss'],
	animations: [Animations.inOpacityScale]
})
export class InfoComponent implements OnInit, OnDestroy {
	public performance: Performance;
	public subscription: Subscription;
	@Output() scene = new EventEmitter<boolean>();

	constructor(public psv: PerformanceService) { }

	ngOnInit(): void {
		this.performance = this.psv.selectedPerformance();
		this.subscription = this.psv.performancesChanged.subscribe(
			() => {
				// console.log("Reading selected performance into info component.");	
				this.performance = this.psv.selectedPerformance();
			});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSessionSelected(sid: number): void {		
		this.psv.selectSession(sid);		
		this.scene.emit(true);
	}

	smallScreen() {
		return (window.innerWidth < 680);
	}
}
