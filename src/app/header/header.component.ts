import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Animations } from '../animations/animations';
import { PerformanceService } from '../services/performace.service';
import { Performance, Session } from '../shared/data.model';
import { Subscription } from 'rxjs/Rx';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	animations: [
	Animations.flyInLeft, Animations.inOpacityScale, Animations.inOpacityScale_Long,
	]
})
export class HeaderComponent implements OnInit, OnDestroy {
	public performances: Performance[];
	public pid: number;  	// selected Performance ID
	public subscription: Subscription;
	@Input() collapsed: boolean = true;
	@Input() sceneShown: boolean = false;
	@Output() info = new EventEmitter<boolean>();
	@Output() scene = new EventEmitter<boolean>();
	@Output() resetTimer = new EventEmitter<boolean>();
	public randomColors: string[] = [];
	constructor(public psv: PerformanceService,
		public router: Router) { }

	ngOnInit(): void {
		this.performances = this.psv.getPerformances();
		for (let perf of this.performances) 
			this.randomColors.push('#' + Math.floor(Math.random()*200).toString(16) +
				Math.floor(Math.random()*200).toString(16) +
				Math.floor(Math.random()*200).toString(16));
		this.pid = this.psv.pid;
		this.subscription = this.psv.performancesChanged.subscribe(
			({performances, pid, sid}) => {											
				this.performances = this.psv.getPerformances();
				this.pid = pid;
			});
		this.onResize()		
	}

	ngOnDestroy(): void {
		if (this.subscription)
			this.subscription.unsubscribe();
	}

	onPerformanceSelected(pid: number): void {
		this.collapsed  = true;
		this.psv.selectPerformance(pid);
		this.info.emit(true);
	}

	onSessionSelected(pid: number, sid: number): void {		
		this.collapsed  = true;
		this.psv.selectPerformance(pid);
		this.psv.selectSession(sid);
		this.info.emit(true);
		this.scene.emit(true);
	}

	switchCollapse(value?: boolean, from?: number): void {
		if (!this.getWidth()) {
			if(value == undefined) {
				if (from == undefined) 					
					this.collapsed = !this.collapsed;
				else if (!this.collapsed)
					this.collapsed = true;
			}
			else 
				this.collapsed = value;
		}
	}

	clickCollapse(value?: boolean): void {		
		if(value == undefined) 
			this.collapsed = !this.collapsed;
		else 
			this.collapsed = value;
	}


	onResize() {
		this.collapsed = this.collapsed || (window.innerWidth < 768);  
	}

	onHoverPerformance(pid: number): void {
		if (!this.sceneShown) {
			this.resetTimer.emit(true)
			this.psv.selectPerformance(pid);
		}
	}

	getWidth() {
		return (window.innerWidth < 768);
	}
}