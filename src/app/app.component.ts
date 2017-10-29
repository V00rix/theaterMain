import { Component, OnInit } from '@angular/core';
import { PerformanceService } from './services/performace.service';
import { Viewer } from './shared/data.model';
import { Subject } from 'rxjs/Rx';
import { Animations } from './animations/animations' 

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		Animations.inOpacityScale, Animations.fadeIn, Animations.inOpacityScale_Long
	]
})
export class AppComponent implements OnInit {
	title = 'app';
	info = false;
	scene = false;
	message = false;
	collapse = true;
	interval;

	public confirmer: Viewer = new Viewer('Chayka Alexandra', '+420-608-841-487', '',
		'vk.com/die136148122', '773 689 106', '773 689 106', '773 689 106');

	constructor(public psv: PerformanceService)  {}

	ngOnInit(): void {		
		this.interval = setInterval(() => {
			this.psv.nextPerformance();
		}, 3000);
	}

	goTo(url: string) {
		window.location.href = url;
	}

	goBack(): void {
		if (this.scene) 
			this.displayScene(false);
		else if (this.info) 
			this.displayInfo(false);
	}

	displayInfo(display: boolean): void {
		this.scene = false;
		this.info = display;
		if (!display) 
			this.onResetTimer();			
		else 
			if (this.interval)
				clearInterval(this.interval);
	}

	displayScene(display: boolean): void {
		this.scene = display;
		if (!display && !this.info) 
				this.onResetTimer();
		else 
			if (this.interval)
				clearInterval(this.interval); 
	}

	displayMessage(display: boolean): void {
		this.message = display;
		if (!display) {
			this.onResetTimer();
			this.info = false;
			this.scene = false;
		}
	}

	tryReset() {
		if (!this.info)
			this.onResetTimer();
	}

	onCollapseHeader() {
		if (window.innerWidth < 680) {
		 	this.collapse = true;
		}
	}

	onResetTimer(): void {		
		if (this.interval)
			clearInterval(this.interval);
		this.interval = setInterval(() => {
			this.psv.nextPerformance();
		}, 3000);
	}

	smallScreen() {
		return (window.innerWidth < 992);
	}
}
