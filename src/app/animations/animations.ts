import { trigger, state, style, animate, transition } from '@angular/animations';

export const Animations = {
	flyInLeft: trigger('flyInLeft', [
		state('displayed', style({
			transform: 'translateX(0)',
			opacity: '1'
		})),
		state('hidden', style({
			transform: 'translateX(-150%)',
			opacity: '0'
		})),
		transition('hidden => displayed', animate('300ms ease-in-out')),
		transition('displayed => hidden', animate('300ms ease-out'))
		]),
	inOpacityScale: trigger('inOpacityScale', [
		state('displayed', style({
			transform: 'scale(1)',
			opacity: '1'
		})),
		transition('void => displayed', [
			style({
				transform: 'scale(1.5)',
				opacity: '0',
				filter: 'blur(10px)'
			}),
			animate('600ms ease-in-out')])
		]),
	inOpacityScale_Long: trigger('inOpacityScale_Long', [
		state('displayed', style({
			transform: 'scale(1)',
			opacity: '1'
		})),
		transition('void => displayed', [
			style({
				transform: 'scale(1.5)',
				opacity: '0',
				filter: 'blur(10px)'
			}),
			animate('1200ms ease-in-out')])
		]),

	fadeIn: trigger('fadeIn', [
		state('displayed', style({
			opacity: '1'
		})),
		transition('void => displayed', [
			style({
				opacity: '0',
			}),
			animate('300ms ease-in-out')])
		]),

	slideIn: trigger('slideIn', [
		state('fromRight', style({
			opacity: '1',
			transform: 'translateX(0)'
		})),
		state('fromLeft', style({
			opacity: '1',
			transform: 'translateX(0)'
		})),
		state('fromTop', style({
			opacity: '1',
			transform: 'translateX(0)'
		})),
		state('fromBottom', style({
			opacity: '1',
			transform: 'translateY(0)'
		})),
		transition('void => fromRight', [
			style({
				opacity: '0',
				transform: 'translateX(150%)'				
			}),
			animate('300ms ease-in-out')]),
		transition('void => fromLeft', [
			style({
				opacity: '0',
				transform: 'translateX(-150%)'			
			}),
			animate('300ms ease-in-out')]),
		transition('void => fromTop', [
			style({
				opacity: '0',
				transform: 'translateY(-150%)'			
			}),
			animate('300ms ease-in-out')]),
		transition('void => fromBottom', [
			style({
				opacity: '0',
				transform: 'translateY(150%)'			
			}),
			animate('300ms ease-in-out')])
		]),
}