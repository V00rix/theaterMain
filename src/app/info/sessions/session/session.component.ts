import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../shared/performance.model';

@Component({
	selector: 'app-session',
	templateUrl: './session.component.html',
	styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
	@Input() session: Session;
	@Input() pid: number; 
	@Input() sid: number; 
	constructor() { }

	ngOnInit() {
	}

}
