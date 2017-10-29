import { Injectable } from '@angular/core';
import { Performance, Session, Availability, Seat } from '../shared/data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Subscription } from "rxjs/Subscription";
import { Response, Http } from '@angular/http';
import 'rxjs/Rx'

@Injectable()
export class PerformanceService {
	/* Variables */
	performancesChanged = new Subject<{performances: Performance[], pid: number, sid: number}>();
	subscription: Subscription;
	// for generator - delete later 
	public words: string[] = ["hello", "winter", "again", "sad", "my", "enrage", "dota 2", "can", "you", "imagine"];
	public urls: string[] = [
	"https://wallpaperbrowse.com/media/images/background-18.jpg",
	null,
	"http://eskipaper.com/images/desktop-backgrounds-14.jpg",
	"http://www.hdwallpaperspulse.com/wp-content/uploads/2013/05/fantasy-wallpapers-background-environment-places-fantastic-array-wallwuzz-hd-wallpaper-4454.jpg"
	];

	/* Selected Performance ID */	
	public pid: number;
	/* Selected Session ID */
	public sid: number;
	/* Array of performances */
	public
 performances: Performance[];

	/* Constructor */
	constructor(private route: ActivatedRoute, private router: Router, private http: Http) {
		this.pid = 0; // there is always a selected performance
		this.sid = null; // session gets specified due to some actions
		// this.httpGetPerformances(); // switch
		this.generatePerformances(); // switch
		// sort performances
		for (let perf of this.performances) {
			var arr = perf.Sessions;
			arr.sort((a,b) => {
				if (a.date < b.date)
					return 0;
				else 
					return 1;
			});
		}
		// subscribe to route changes
		this.subscription = this.route.queryParams.subscribe(
			params => {				
				let pid = +params['pid'] - 1;												
				if (!isNaN(pid))  {
					if (pid < 0 || pid > this.performances.length) 
						this.router.navigate(['/404']);
					this.pid = pid;
				}
				let sid = +params['sid'] - 1;					
				if (!isNaN(sid))  {
					if (sid < 0 || sid > this.performances[this.pid].Sessions.length) 
						this.router.navigate(['/404']);
					this.sid = sid;
				}
				this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});
			});	
		console.log(this.performances);
	}

	public selectedPerformance(): Performance {
		return this.performances[this.pid];
	}

	public selectedSession(): Session {		
		return this.performances[this.pid].Sessions[this.sid];
	}

	public selectPerformance(pid: number): void {
		this.checkPid(pid);
		this.pid = pid;
		this.sid = null;
		this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});
	}

	public selectSession(sid: number): void {
		this.checkSid(sid, this.selectedPerformance());
		this.sid = sid;
		this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});
	}

	public selectPS(pid: number, sid: number): void {
		this.pid = pid;
		this.sid = sid;
		this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});	
	}

	getFilteredPerformances(): Performance[] {
		let arr = this.performances.slice();
		for (let perf of arr)
			perf.Sessions = perf.getFilteredSessions();
		return arr;
	}

	/* Fake Performances generation function */
	public generatePerformances(): void {
		this.performances = [];
		// generate performances
		for (let i = 0; i < 3; i++) {
			this.performances.push(new Performance(this.generateName(), this.urls[i % this.urls.length], [], 
				{key: "new", value: "hello"}, {key: "Description", value: this.generateDescription()}, ));
			// generate Sessions
			for (let k = 0; k < this.randomBetwen(2, 5); k++)  {
				this.performances[i].Sessions.push(new Session(this.generateDate(), []));
				// generate rows
				for (let j = 0; j < this.randomBetwen(8, 15); j++) {
					this.performances[i].Sessions[k].seats.push([]);
					// generete nubmer of seats in a row 
					for (let h = 0; h < this.randomBetwen(10, 21); h++) { // yo its yah boi
						// change 'h' to 'j'
						// and magic happens
						this.performances[i].Sessions[k].seats[j].push(new Seat(this.generateAvailability()));				
						// this.performances[i].Sessions[k].seats[j].push(new Seat(this.generateAvailability()));				
					}
				}
			}
		}
		this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});
	} // this takes some time to load Xd

	/* Helpers for Performances generation */
	public generateName(): string {
		return this.words[this.randomBetwen(0,this.words.length)];
	}

	public generateDescription(): string {
		return (this.words[this.randomBetwen(0,this.words.length)] + " " +
			this.words[this.randomBetwen(0,this.words.length)] + " " +
			this.words[this.randomBetwen(0,this.words.length)] + " " +
			this.words[this.randomBetwen(0,this.words.length)] + " " +
			this.words[this.randomBetwen(0,this.words.length)] + " " +
			this.words[this.randomBetwen(0,this.words.length)] + " " +
			this.words[this.randomBetwen(0,this.words.length)]);
	}

	public generateDate(): Date {
		let year = this.randomBetwen(2016, 2017);
		let month = this.randomBetwen(1, 2);
		let day = this.randomBetwen(1, 2); // not correct randomizer, but whatever -
		// this is only for testing
		let hour = this.randomBetwen(14, 25);
		let minutes = this.randomBetwen(0, 12) * 5; // 0, 5, 10, 15, 20, ..., 55
		return new Date(year, month, day, hour, minutes);
	}

	public generateAvailability(): Availability {
		let av = this.randomBetwen(0,4);
		switch (av) {
			case 0:
			return Availability.Hidden;
			case 1:
			return Availability.Booked;
			case 2:
			return Availability.Pending;
			case 3:
			return Availability.Available;
		}
	}

	/* Generate random integer betwen selected ones */
	public randomBetwen(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min) + min);
	}

	// TODO: this should be gotten from server
	public getPerformances(): Performance[] {
		return this.performances;
	}

	public getPerformance(pid: number): Performance {
		this.checkPid(pid);
		return this.performances[pid];
	}

	public addPerformance(Performance: Performance): void {
		this.performances.push(Performance);
		this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});			
	}

	public updatePerformance(pid: number, Performance: Performance): void {
		this.checkPid(pid);
		this.performances[pid] = Performance;
		this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});	
	}

	public deletePerformance(pid: number): void {
		this.checkPid(pid);
		this.performances.splice(pid, 1);	
		if (pid === this.pid) 
			this.pid = 0;
		this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});	
	}

	public loadPerformances(performances: Performance[]): void {
		this.performances = performances;		
		this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});	
	}

	// select next through performances
	public nextPerformance(): void {
		let spid = this.pid + 1;
		spid = spid === this.performances.length ? 0 : spid;
		this.selectPerformance(spid);
	}

	checkPid(pid: number): void {		
		if (!pid && pid !== 0) 
			throw new Error("Performance ID (" + pid + ") is not a valid number!");
		if (pid > this.performances.length - 1)
			throw "Performance ID (" + pid + ") exceeds total number of performances (" + this.performances.length + ")!";
		if (pid < 0)
			throw "Performance ID (" + pid + ") is less then zero!";
	}

	checkSid(sid: number, performance: Performance): void {
		if (!sid && sid !== 0) 
			throw new Error("Session id (" + sid + ") is not a valid number!");
		if (sid > performance.Sessions.length - 1)
			throw "Session ID (" + sid + ") exceeds total number of Sessions ("
		+ performance.Sessions.length + ")!";
		if (sid < 0)
			throw "Session ID (" + sid + ") is less then zero!";
	}

	httpStorePerformances(): void {
		this.http.put('https://perfoseats.firebaseio.com/perfoseats.json', this.getPerformances())
		.subscribe(
			(response: Response) => {
				console.log("Response status: " + response.statusText);
			},
			(error: Response) => {
				console.log(error);
			});
	}
	httpGetPerformances(): void {
		this.performances = [];
		this.http.get('https://perfoseats.firebaseio.com/perfoseats.json')
		.map(
			(response: Response) => {
				console.log(response);				
				const performances: Performance[] = response.json();
				for (let performance of performances) {
					if (!performance['Sessions']) 
						performance['Sessions'] = [];
					for (let session of performance.Sessions) {
						if (!session['Seats']) 
							session.seats = [];
					}
				}
				return performances;
			},
			(error: Response) => {
				console.log(error);
			}
			)
		.subscribe(
			(performances: Performance[]) => {
				this.loadPerformances(performances);
			});
	}
}