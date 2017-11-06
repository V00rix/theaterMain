import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Seat, Viewer, Availability } from '../../shared/data.model';
import { PerformanceService } from '../../services/performace.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-fields',
	templateUrl: './fields.component.html',
	styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {
	@Input() performanceName: string;
	@Input() sessionDate: Date;
	@Input() seats: Seat[];
	@Output() seatCanceled = new EventEmitter<Seat>();
	@Output() message = new EventEmitter<boolean>();

	constructor(public psv: PerformanceService) {}

	ngOnInit() {
		// display sorted seats
		this.seats.sort((a, b) => { 
			if (a.fromScreen > b.fromScreen)
				return 1;
			if (a.fromScreen < b.fromScreen)
				return 0;
			else {
				if (a.fromLeft >= b.fromLeft)
					return 1;
				else 
					return 0;
			}});	
	}

	onConfirm() {		
		console.log("Sending data...");
		for (let seat of this.seats) 
			seat.availability = Availability.Pending;
		this.message.emit(true);
		this.psv.httpStorePerformances();	
	}

	public regx: {reg: RegExp, key: string }[] = [
	{reg: /^(([a-z -'`A-Z]*)|([а-я -'`А-Я]*)|([a-z -'`A-ZěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮ]*))$/, key: "Name"},
	{reg: /^((\+[0-9][0-9][0-9][ -]?)?[0-9][0-9][0-9][ -]?[0-9][0-9][0-9][ -]?[0-9][0-9][0-9])$/, key: "Phone"},
	{reg: /^([a-zA-Z0-9.])*@([a-zA-Z])*\.([a-zA-Z])+$/, key: "Email"},
	{reg: /^vk\.com\/([a-zA-Z0-9-_.])*$/, key: "VK"},
	{reg: /^.*$/, key: "any"}
	];

	dataValid(): boolean {
		let result = true;
		for (let seat of this.seats) {
			// validate name
			let i = 0;
			for (let property in seat.viewer) {
				if (i < 3) { // mandatory fields
					if (seat.viewer[property] == Viewer['_' + property])				
						result = false;
					else {
						// get related regexp
						let reg = (this.regx.find(r => r.key== property)
							|| {reg: /^.*$/, key: 'any'}).reg;
						// check against it
						let check = this.checkField(seat.viewer[property], property, reg);
						// take previous value and combine with current evaluation
						// if 'result' was false, it won't become true ever again
						//                 if mandatory, then  
						//     prev. val.  check if field is valid
						result = result	&& !check.statuses; 
					}
					i++;
				}
			}
			if (!result)
				return false;
		}
		return true;
	}

	cancelSeat(seat: Seat): void {
		this.seatCanceled.emit(seat);
	}

	getInputFromSelect(value) {
		console.log(value);
	}

	onInput(vProperty, event: Event, infoEl) {
		var el = <HTMLInputElement>event.srcElement; 
		var il = <HTMLElement>infoEl;
		let reg = (this.regx.find(r => r.key	== el.name) || 
			{reg: /^.*$/, key: 'any'}).reg;
		if (!this.checkField(el.value, el.name, reg).statuses) {
			this.errorShown(false, el, il);
			vProperty.viewer[el.name] = el.value;
		}
		else {
			this.errorShown(true, el, null);
		}
	}

	focus(event: Event, infoEl) {
		var el = <HTMLInputElement>event.srcElement;
		var il = <HTMLElement>infoEl;
		switch (event.type) {
			case "focus":
			if (el.value == Viewer['_' + el.name]) {					
				el.value = '';
				if (el.name == 'VK')
					el.value = 'vk.com/'
			}
			break;
			case "focusout":
			let reg = (this.regx.find(r => r.key == el.name) || 
				{reg: /^.*$/, key: 'any'}).reg;
			let checks = this.checkField(el.value, el.name, reg); 
			if (!checks.statuses) 
				this.errorShown(false, el, il, checks.messages);
			else {
				if (checks.statuses.includes(1)) {
					el.value = Viewer['_' + el.name];
					if ((parseInt(el.id) < 3)) 
						this.errorShown(true, el, il, checks.messages);
				}
				else if (checks.statuses.includes(2)) {
					if ((parseInt(el.id) < 3)) 
						this.errorShown(true, el, il, checks.messages);
				}
			}
			break;
		}
	}

	checkField(value: string, key: string, regexp: RegExp, name?: string): {statuses: number[], messages: string[]} {			
		let results: {statuses: number[], messages: string[]} = {statuses: null, messages: null};
		let initialize = () => {
			if (!results.messages) {
				results.messages = [];
				results.statuses = [];
			}
		};
		// regexp for whitespaces
		if (/^ *$/.test(value) || /^vk\.com\/ *$/.test(value)) {
			let message = (name || key) + " wasn't entered!";
			console.log(message);
			initialize();
			results.messages.push(message)
			results.statuses.push(1);
		}
		else if(!regexp.test(value)) {
			let message = "Invalid " + (name || key);
			console.log(message);
			initialize();
			results.messages.push(message);
			results.statuses.push(2);
		}
		return results;
	}

	getProperty(val) {
		if (val === 'Name')
			return 'Имя';
		if (val === 'Phone')
			return 'Телефон';
		return val;
	}

	errorShown(shown: boolean, field, helper, messages?: string[]): void {
		if (shown) {
			if (field != null) {
				field.classList.remove('valid');
				field.classList.add('invalid');
			}
			if (helper != null) {
				helper.classList.remove('hidden');
			}
		}
		else {
			if (field != null) {				
				field.classList.add('valid');
				field.classList.remove('invalid');
			}
			if (helper != null) {
				helper.classList.add('hidden');
			}
		}
	}
}