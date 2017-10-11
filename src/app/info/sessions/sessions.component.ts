import { Component, OnInit, Input } from '@angular/core';
import { Performance } from '../../shared/performance.model';

@Component({
	selector: 'app-sessions',
	templateUrl: './sessions.component.html',
	styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
	@Input() performance: Performance;
	@Input() pid: number;
	constructor() { }

	ngOnInit() {
	}

}
